"use server";

import "server-only";

import { handleError } from "@/lib/handleError";
import CartModel from "@/models/cart";
import CartItemModel from "@/models/cart-item";
import CartItemGroupModel from "@/models/cart-item-group";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/user";

async function handleCartMerge(email: string) {
	try {
		const anonymousSession = await getAnonymousSessionId();

		if (!anonymousSession) return;
		await connectMongo();

		const anonymousCart = await CartModel.findOne({ sessionId: anonymousSession });

		if (!anonymousCart) return;

		const user = await UserModel.findOne({ email });
		if (!user) return;

		const userId = user.id;

		const existingCart = await CartModel.findOne({ userId });

		if (!existingCart) {
			anonymousCart.sessionId = "";
			anonymousCart.userId = userId;
			await anonymousCart.save();
		} else {
			// add all anonymous cart items to existing cart
			await CartItemModel.updateMany({ cartId: anonymousCart._id }, { cartId: existingCart._id });

			// add all anonymous cart group to existing cart
			await CartItemGroupModel.updateMany({ cartId: anonymousCart._id }, { cartId: existingCart._id });

			// delete anonymous cart
			await CartModel.findByIdAndDelete(anonymousCart._id);
		}
	} catch (error) {
		const message = handleError(error);
		console.log(message);
	}
}

export default handleCartMerge;
