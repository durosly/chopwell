import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import CartModel from "@/models/cart";
import CartItemModel from "@/models/cart-item";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";

async function loadCartIds() {
	try {
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
			return Response.json({ data: [] });
		}

		// get all food item ids in the cart ensuring no duplicates
		const cartItems = await CartItemModel.find({ cartId: cart._id });
		const foodIds = [...new Set(cartItems.map((item) => item.foodId))];

		return Response.json({ message: "Food item added to cart", data: foodIds });
	} catch (error) {
		console.log("Error in add-to-fav", error);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default loadCartIds;
