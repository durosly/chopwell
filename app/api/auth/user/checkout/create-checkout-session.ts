import getCheckoutDataAction from "@/actions/get-checkout-action";
import { handleError } from "@/lib/handleError";
import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import OrderModel from "@/models/order";
import UserModel from "@/models/user";
import WalletModel from "@/models/wallet";
import FoodModel from "@/models/food";
import NotificationModel from "@/models/notifications";
import TransactionModel from "@/models/transactions";
import AddressModel from "@/models/address";
import CartModel from "@/models/cart";
import CartItemGroupModel from "@/models/cart-item-group";
import CartItemModel from "@/models/cart-item";
import { withAuth } from "@/utils/with-user-auth";
import { after } from "next/server";
import pusherServer from "@/lib/pusher-server";

interface CartItem {
	_foodId: string;
	name: string;
	price: number;
	quantity: number;
	available: boolean;
	unit: string;
}

interface CartGroup {
	title: string;
	items: CartItem[];
}

interface CheckoutData {
	data: CartGroup[];
	total: number;
}

// interface DeliveryAddress {
// 	location: string;
// 	landmark: string;
// 	_regionId: {
// 		_id: string;
// 		title: string;
// 		deliveryPrice: number;
// 	};
// 	deliveryPrice: number;
// }

// Validation schema for order data
// const orderDataSchema = z.object({
// 	shipping: z
// 		.object({
// 			method: z.enum(["delivery", "pickup"]),
// 			address: z.string().optional(),
// 		})
// 		.refine(
// 			(data) => {
// 				if (data.method === "delivery" && !data.address) {
// 					return false;
// 				}
// 				return true;
// 			},
// 			{
// 				message: "Delivery address is required for delivery orders",
// 			}
// 		),
// });

async function createCheckoutSession() {
	try {
		// const data = await req.json();
		const session = await auth();
		const userId = session?.user.id;

		if (!userId) {
			return Response.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Validate order data
		// const validationResult = orderDataSchema.safeParse(data);
		// if (!validationResult.success) {
		// 	return Response.json(
		// 		{
		// 			message: "Invalid order data",
		// 			errors: validationResult.error.errors,
		// 		},
		// 		{ status: 400 }
		// 	);
		// }

		// Get cart data
		const checkoutResponse = await getCheckoutDataAction();
		if (checkoutResponse.status === false) {
			return Response.json(
				{ message: checkoutResponse.message },
				{ status: 400 }
			);
		}

		if (!checkoutResponse.data) {
			return Response.json(
				{ message: "No checkout data available" },
				{ status: 400 }
			);
		}

		const checkoutData: CheckoutData = checkoutResponse.data;
		if (!checkoutData?.data || checkoutData?.data.length === 0) {
			return Response.json({ message: "Cart is empty" }, { status: 400 });
		}

		// load user model
		const user = await UserModel.findById(userId);

		if (!user) {
			return Response.json({ message: "Unathorized" }, { status: 401 });
		}

		const wallet = await WalletModel.findOne({ _userId: user.id });

		let checkoutTotal = checkoutData.total;

		// Get request data
		// const reqData = validationResult.data;
		const address = await AddressModel.findOne({
			_userId: user.id,
			default: true,
		}).populate("_regionId");

		if (!address) {
			return Response.json(
				{ message: "No default address found" },
				{ status: 400 }
			);
		}

		if (!address._regionId) {
			return Response.json(
				{
					message: "Region for current default address is no longer available",
				},
				{ status: 400 }
			);
		}

		// let deliveryAddress: DeliveryAddress | undefined;

		const deliveryPrice = address._regionId.deliveryPrice;
		checkoutTotal += Number(deliveryPrice);
		const deliveryAddress = {
			location: address.location,
			landmark: address.landmark,
			_regionId: address._regionId._id,
			deliveryPrice: Number(deliveryPrice),
		};

		if (!wallet || checkoutTotal > wallet.balance) {
			return Response.json({ message: "Balance is too low" }, { status: 400 });
		}

		// Validate items availability and quantities
		const itemQuantities: Record<string, number> = {};
		for (const group of checkoutData.data) {
			for (const item of group.items) {
				if (!item.available) {
					return Response.json(
						{ message: `${item.name} is no longer available` },
						{ status: 404 }
					);
				}

				if (itemQuantities[item._foodId]) {
					itemQuantities[item._foodId] += item.quantity;
				} else {
					itemQuantities[item._foodId] = item.quantity;
				}
			}
		}
		// Connect to MongoDB
		await connectMongo();

		for (const id of Object.keys(itemQuantities)) {
			const foodItem = await FoodModel.findById(id);
			if (!foodItem) {
				return Response.json(
					{ message: "Food item not found" },
					{ status: 404 }
				);
			}
			if (foodItem.number_of_item < itemQuantities[id]) {
				return Response.json(
					{
						message: `${foodItem.name} quantity is not sufficient for your demand`,
					},
					{ status: 404 }
				);
			}
		}

		// Reduce food item quantity in db. set availability to false if item quantity hits zero
		for (const id of Object.keys(itemQuantities)) {
			const foodItem = await FoodModel.findById(id);
			if (!foodItem) continue;

			foodItem.number_of_item -= itemQuantities[id];
			foodItem.available = foodItem.number_of_item > 0;
			await foodItem.save();
		}

		// Create order
		const order = new OrderModel({
			_userId: userId,
			method_of_delivery: "delivery",
			type: "purchase",
			method_of_payment: "balance",
			status: "pending",
			payment_status: true,
			products: checkoutData.data.flatMap((group) =>
				group.items.map((item) => ({
					_productId: item._foodId,
					price: item.price.toString(),
					quantity: item.quantity,
					label: group.title,
					unit: item.unit,
				}))
			),
			totalPrice: checkoutTotal,
			delivery_address: deliveryAddress,
			deliveryPrice: deliveryAddress?.deliveryPrice,
		});

		await order.save();

		// Clear cart
		const cart = await CartModel.findOne({ userId });
		if (cart) {
			await CartItemGroupModel.deleteMany({ cartId: cart._id });
			await CartItemModel.deleteMany({ cartId: cart._id });
		}

		wallet.balance -= Number(checkoutTotal);
		await wallet.save();

		const message = "Checkout process complete";

		after(() => {
			console.log("Checkout process completed");
			async function notification() {
				// Notificaition
				await NotificationModel.create({
					_userId: userId,
					title: "Checkout complete",
					description: "Your order is been processed",
					link: `/user/orders/${order.id}`,
					linkDescription: "view order",
				});
				// Transaction
				await TransactionModel.create({
					_userId: userId,
					type: "purchase",
					amount: checkoutTotal,
					description: "Purchase items #" + order.code,
					status: "success",
				});

				// TODO: trigger push.js notification to notify admin
				pusherServer.trigger(`private-notifications-admin`, "new-order", {
					orderId: order.id,
					orderCode: order.code,
					orderTotal: order.totalPrice,
					username: user?.firstname + " " + user?.lastname,
				});

				pusherServer.trigger(
					`private-notifications-${userId}`,
					"notification-count",
					{
						count: 1,
					}
				);
			}

			notification();
		});

		return Response.json({
			message,
			orderId: order._id,
			orderCode: order.code.toUpperCase(),
		});
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(createCheckoutSession);
