import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CartModel from "@/models/cart";
import CartItemModel from "@/models/cart-item";
import CartItemGroupModel from "@/models/cart-item-group";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";

async function clearUserCart() {
	try {
		await connectMongo();

		const sessionId = await getAnonymousSessionId();

		const session = await auth();
		const userId = session?.user.id;

		const filter = userId ? { userId } : { sessionId };
		const cart = await CartModel.findOneAndDelete(filter);

		if (!cart) {
			return Response.json({ message: "Cart not found" }, { status: 404 });
		}

		await CartItemGroupModel.deleteMany({ cartId: cart._id });
		await CartItemModel.deleteMany({ cartId: cart._id });

		return Response.json({ message: "Cart cleared successfully" });
	} catch (error) {
		const message = handleError(error);
		console.error(message);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default clearUserCart;
