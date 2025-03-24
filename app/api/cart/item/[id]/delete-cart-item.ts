import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CartModel from "@/models/cart";
import CartItemModel from "@/models/cart-item";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";

type Params = Promise<{ id: string }>;

async function deleteCartItem(_: Request, { params }: { params: Params }) {
	try {
		await connectMongo();

		const id = (await params).id;
		let sessionId = "";
		const session = await auth();
		const userId = session?.user.id;

		if (!userId) {
			sessionId = await getAnonymousSessionId();
		}

		if (!sessionId && !userId) {
			return Response.json(
				{ message: "Error creating session. Please, log in to continue" },
				{ status: 500 }
			);
		}

		const filter = userId ? { userId } : { sessionId };

		const cart = await CartModel.findOne(filter);

		if (!cart) {
			return Response.json({ message: "Cart not found" }, { status: 404 });
		}

		const cartItem = await CartItemModel.findByIdAndDelete(id);

		return Response.json({ message: "Item deleted", data: cartItem });
	} catch (error) {
		const message = handleError(error);
		console.error(message);

		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default deleteCartItem;
