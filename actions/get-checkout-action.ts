"use server";
import "server-only";
import getCartDataAction from "./get-cart-action";
import { handleError } from "@/lib/handleError";

async function getCheckoutDataAction() {
	try {
		const cartAction = await getCartDataAction();

		if (cartAction.status === false) {
			return { status: false, message: cartAction.message };
		}

		const cartData = cartAction.data;

		// reshape cart data to match checkout data requirement

		console.log(cartData);

		return { status: true, data: cartData };
	} catch (error) {
		const message = handleError(error);
		return { status: false, message };
	}
}

export default getCheckoutDataAction;
