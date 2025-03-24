import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CartModel from "@/models/cart";
import CartItemModel from "@/models/cart-item";
import CartItemGroupModel from "@/models/cart-item-group";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";

async function addNewGroup() {
	try {
		await connectMongo();

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

		// if the last group has no items, return an error
		const cartGroups = await CartItemGroupModel.find({ cartId: cart._id });
		const lastGroup = cartGroups[cartGroups.length - 1];
		const itemsInLastGroup = await CartItemModel.find({ groupId: lastGroup._id });
		if (itemsInLastGroup.length === 0) {
			return Response.json(
				{ message: "Add items to the last group first" },
				{ status: 400 }
			);
		}

		// add a new group with title "Cart group n" where n is the number of groups + 1
		await CartItemGroupModel.create({
			title: `My Cart ${cartGroups.length + 1}`,
			cartId: cart._id,
		});

		return Response.json({ message: "New group added" });
	} catch (error) {
		const message = handleError(error);
		console.error(message);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default addNewGroup;
