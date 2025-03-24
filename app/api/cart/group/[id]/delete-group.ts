import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CartModel from "@/models/cart";
import CartItemModel from "@/models/cart-item";
import CartItemGroupModel from "@/models/cart-item-group";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";

type Params = Promise<{ id: string }>;

async function deleteGroup(_: Request, { params }: { params: Params }) {
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

		const cartGroup = await CartItemGroupModel.findOne({ _id: id, cartId: cart._id });

		if (!cartGroup) {
			return Response.json({ message: "Group not found" }, { status: 404 });
		}

		// delete the group
		await CartItemGroupModel.findByIdAndDelete(id);

		await CartItemModel.deleteMany({ groupId: id });

		const otherGroups = await CartItemGroupModel.find({ cartId: cart._id });
		if (otherGroups.length === 0) {
			await CartModel.findByIdAndDelete(cart._id);
		}

		return Response.json({ message: "Group deleted" });
	} catch (error) {
		const message = handleError(error);
		console.error(message);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default deleteGroup;
