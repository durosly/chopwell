import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import CartModel from "@/models/cart";
import { handleError } from "@/lib/handleError";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import CartItemModel from "@/models/cart-item";
import CartItemGroupModel from "@/models/cart-item-group";
import { omit } from "lodash";

async function copyItem(request: Request) {
	try {
		const { cartItemId, groupId } = await request.json();

		await connectMongo();

		const sessionId = await getAnonymousSessionId();

		const session = await auth();
		const userId = session?.user.id;

		const filter = userId ? { userId } : { sessionId };
		const cart = await CartModel.findOne(filter);

		if (!cart) {
			return Response.json({ message: "Cart not found" }, { status: 404 });
		}

		const cartItem = await CartItemModel.findOne({ _id: cartItemId, cartId: cart._id });
		if (!cartItem) {
			return Response.json({ message: "Cart item not found" }, { status: 404 });
		}

		if (cartItem.groupId.toString() === groupId) {
			return Response.json(
				{ message: "Item already in this group" },
				{ status: 400 }
			);
		}

		const group = await CartItemGroupModel.findOne({ _id: groupId, cartId: cart._id });
		if (!group) {
			return Response.json({ message: "Group not found" }, { status: 404 });
		}

		await CartItemModel.create({
			...omit(cartItem.toObject(), ["_id"]),
			groupId,
			cartId: cart._id,
		});

		return Response.json({ message: "Item copied successfully" }, { status: 200 });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default copyItem;
