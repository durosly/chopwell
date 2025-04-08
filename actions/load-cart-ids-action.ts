import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import CartModel from "@/models/cart";
import CartItemModel from "@/models/cart-item";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";

async function loadCartIdsAction() {
	await connectMongo();

	let sessionId = "";
	const session = await auth();
	const userId = session?.user.id;

	if (!userId) {
		sessionId = await getAnonymousSessionId();
	}

	const filter = userId ? { userId } : { sessionId };

	const cart = await CartModel.findOne(filter);

	if (!cart) {
		return null;
	}

	// get all food item ids in the cart ensuring no duplicates
	const cartItems = await CartItemModel.find({ cartId: cart._id });
	return [...new Set(cartItems.map((item) => item.foodId))];
}

export default loadCartIdsAction;
