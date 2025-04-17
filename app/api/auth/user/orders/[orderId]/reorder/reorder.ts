import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import AddressModel from "@/models/address";
import FoodModel from "@/models/food";
import NotificationModel from "@/models/notifications";
import OrderModel from "@/models/order";
import TransactionModel from "@/models/transactions";
import WalletModel from "@/models/wallet";
import { withAuth } from "@/utils/with-user-auth";

async function reorder(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
	try {
		const { orderId } = await params;
		const { addressId } = await request.json();

		const session = await auth();
		if (!session?.user) {
			return Response.json({ message: "Unauthorized" }, { status: 401 });
		}

		const userId = session.user.id;

		await connectMongo();

		const order = await OrderModel.findById(orderId).populate("products._productId");
		if (!order) {
			return Response.json({ message: "Order not found" }, { status: 404 });
		}

		if (order._userId.toString() !== session.user.id) {
			return Response.json({ message: "Unauthorized" }, { status: 401 });
		}

		// TODO: check if each item is still available
		const itemQuantities = {};
		for (const item of order.products) {
			if (!item._productId.available) {
				return Response.json(
					{
						message: `${item._productId.name} is no longer available`,
					},
					{ status: 404 }
				);
			}

			if (itemQuantities[item._productId.id]) {
				itemQuantities[item._productId.id] += item.quantity;
			} else {
				itemQuantities[item._productId.id] = item.quantity;
			}
		}

		// TODO: check if each item quantity in current order is still available
		for (const item of order.products) {
			if (itemQuantities[item._productId.id] > item._productId.quantity) {
				return Response.json(
					{
						message: `${item._productId.name} is no longer available`,
					},
					{ status: 404 }
				);
			}
		}

		// TODO: check if address is still available

		let deliveryPrice = 0;
		if (addressId === "default") {
			return Response.json(
				{ message: "Default address not found" },
				{ status: 404 }
			);
		} else {
			const address =
				await AddressModel.findById(addressId).populate("_regionId");
			if (!address) {
				return Response.json(
					{ message: "Address not found" },
					{ status: 404 }
				);
			}

			if (address._userId.toString() !== session.user.id) {
				return Response.json({ message: "Unauthorized" }, { status: 401 });
			}

			// TODO: get delivery fee
			deliveryPrice = address._regionId.deliveryPrice;
		}

		// TODO: calculate total price
		let totalPrice = 0;
		for (const item of order.products) {
			totalPrice += item._productId.price * item.quantity;
			item.price = item._productId.price;
		}
		totalPrice += deliveryPrice;

		// TODO: check if user has enough balance
		const wallet = await WalletModel.findOne({ _userId: session.user.id });
		if (!wallet) {
			return Response.json({ message: "Wallet not found" }, { status: 404 });
		}
		if (wallet.balance < totalPrice) {
			return Response.json(
				{
					message: "Insufficient balance. Price of some items may have changed.",
				},
				{ status: 400 }
			);
		}

		wallet.balance -= totalPrice;
		await wallet.save();

		// Reduce food item quantity in db. set availability to false if item quantity hits zero
		for (const id of Object.keys(itemQuantities)) {
			const foodItem = await FoodModel.findById(id);
			if (!foodItem) continue;

			foodItem.number_of_item -= itemQuantities[id];
			foodItem.available = foodItem.number_of_item > 0;
			await foodItem.save();
		}

		// TODO: create new order
		const newOrder = await OrderModel.create({
			method_of_delivery: order.method_of_delivery,
			method_of_payment: "balance",
			status: "pending",
			payment_status: true,
			_userId: session.user.id,
			products: order.products,
			totalPrice,
			deliveryPrice,
			_addressId: addressId,
		});

		// Notificaition
		await NotificationModel.create({
			_userId: userId,
			title: "Reorder complete",
			description: "Your order is been processed",
			link: `/user/orders/${newOrder._id}`,
			linkDescription: "view order",
		});
		// Transaction
		await TransactionModel.create({
			_userId: userId,
			type: "purchase",
			amount: totalPrice,
			description: "Reorder items #" + newOrder.code,
			status: "success",
		});

		// TODO: return new order id

		return Response.json({ message: "Reordered successfully", order: newOrder._id });
	} catch (error) {
		const message = handleError(error);
		return Response.json(message, { status: 500 });
	}
}

export default withAuth(reorder);
