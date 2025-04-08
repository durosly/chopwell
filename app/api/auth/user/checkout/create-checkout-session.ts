import getCheckoutDataAction from "@/actions/get-checkout-action";
import { handleError } from "@/lib/handleError";
import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import OrderModel from "@/models/order";
import CartModel from "@/models/cart";
import CartItemGroupModel from "@/models/cart-item-group";
import CartItemModel from "@/models/cart-item";
import { z } from "zod";
import UserModel from "@/models/user";

// Validation schema for order data
const orderDataSchema = z.object({
	// paymentDetails: z.object({
	// 	method: z.enum(["card", "wallet", "virtual-account", "pay-for-me"]),
	// 	card: z.object({
	// 		options: z.enum(["existing", "new"]),
	// 		existing: z.string().optional(),
	// 		new: z
	// 			.object({
	// 				cardNumber: z.string(),
	// 				expiryDate: z.string(),
	// 				cvc: z.string(),
	// 				saveForFuture: z.boolean(),
	// 			})
	// 			.optional(),
	// 	}),
	// }),
	shipping: z.object({
		method: z.enum(["delivery", "pickup"]),
		address: z.any().optional(),
	}),
});

async function createCheckoutSession(req: Request) {
	try {
		const data = await req.json();
		const session = await auth();
		const userId = session?.user.id;

		if (!userId) {
			return Response.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Validate order data
		const validationResult = orderDataSchema.safeParse(data);
		if (!validationResult.success) {
			return Response.json(
				{
					message: "Invalid order data",
					errors: validationResult.error.errors,
				},
				{ status: 400 }
			);
		}

		// Get cart data
		const checkoutResponse = await getCheckoutDataAction();
		if (checkoutResponse.status === false) {
			return Response.json(
				{ message: checkoutResponse.message },
				{ status: 400 }
			);
		}

		const checkoutData = checkoutResponse.data;
		if (!checkoutData?.data || checkoutData?.data.length === 0) {
			return Response.json({ message: "Cart is empty" }, { status: 400 });
		}

		// load user model
		const user = await UserModel.findById(userId);

		if (!user) {
			return Response.json({ message: "Unathorized" }, { status: 401 });
		}

		// Get request data
		const reqData = validationResult.data;

		// console.log(reqData)

		if (!user?.balance || checkoutData.total > user.balance) {
			return Response.json({ message: "Balance is too low" }, { status: 400 });
		}

		console.log(checkoutData.total, user.balance, "Balance comparison");

		// Validate items availability and quantities
		for (const group of checkoutData.data) {
			for (const item of group.items) {
				if (!item.available) {
					return Response.json(
						{ message: `${item.name} is no longer available` },
						{ status: 404 }
					);
				}

				// TODO: Add quantity validation against database
				// This would require checking the actual available quantity in the database
			}

			// TODO: Reduce quantity for each item
		}

		// Connect to MongoDB
		await connectMongo();

		// Create order
		const order = new OrderModel({
			_userId: userId,
			method_of_delivery: reqData.shipping.method,
			method_of_payment: "balance",
			status: "pending",
			payment_status: true,
			products: checkoutData.data.flatMap((group) =>
				group.items.map((item) => ({
					_productId: item._foodId,
					price: item.price.toString(),
					quantity: item.quantity,
				}))
			),
			totalPrice: checkoutData.total,
		});

		await order.save();

		// Clear cart
		const cart = await CartModel.findOne({ userId });
		if (cart) {
			await CartItemGroupModel.deleteMany({ cartId: cart._id });
			await CartItemModel.deleteMany({ cartId: cart._id });
		}

		const message = "Checkout process complete";

		return Response.json({ message, orderId: order._id });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default createCheckoutSession;
