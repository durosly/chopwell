import getCheckoutDataAction from "@/actions/get-checkout-action";
import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CartModel from "@/models/cart";
import CartItemModel from "@/models/cart-item";
import CartItemGroupModel from "@/models/cart-item-group";
import FoodModel from "@/models/food";
import OrderModel from "@/models/order";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import { withAuth } from "@/utils/with-user-auth";

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

async function bookOder() {
	try {
		let sessionId = "";
		const session = await auth();
		const userId = session?.user.id;

		if (!userId) {
			sessionId = await getAnonymousSessionId();
		}

		const filter = userId ? { userId } : { sessionId };

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

		const checkoutTotal = checkoutData.total;

		// Validate items availability and quantities
		const itemQuantities: Record<string, number> = {};
		for (const group of checkoutData.data) {
			for (const item of group.items) {
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
		}

		// Create order
		const order = new OrderModel({
			method_of_delivery: "delivery",
			type: "generated",
			method_of_payment: "NULL",
			status: "pending",
			payment_status: false,
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
		});

		await order.save();

		// Clear cart
		const cart = await CartModel.findOne(filter);
		if (cart) {
			await CartItemGroupModel.deleteMany({ cartId: cart._id });
			await CartItemModel.deleteMany({ cartId: cart._id });
		}

		const message = "Order booked successfully";

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

export default withAuth(bookOder);
