import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CartModel from "@/models/cart";
import CartItemModel from "@/models/cart-item";
import FoodModel from "@/models/food";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";

type Params = Promise<{ id: string }>;

async function updateCartItem(req: Request, { params }: { params: Params }) {
	try {
		await connectMongo();

		const id = (await params).id;
		const { quantity } = await req.json();
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

		if (quantity < 1) {
			return Response.json(
				{ message: "Quantity must be greater than 0" },
				{ status: 400 }
			);
		}

		const filter = userId ? { userId } : { sessionId };

		const cart = await CartModel.findOne(filter);

		if (!cart) {
			return Response.json({ message: "Cart not found" }, { status: 404 });
		}

		const cartItem = await CartItemModel.findOne({ _id: id, cartId: cart._id });

		if (!cartItem) {
			return Response.json({ message: "Item not found" }, { status: 404 });
		}

		const food = await FoodModel.findById(cartItem.foodId);

		if (!food) {
			return Response.json({ message: "No longer available" }, { status: 404 });
		}

		if (food.number_of_item < quantity) {
			return Response.json(
				{ message: `We cannot server more than ${quantity} at the moment` },
				{ status: 400 }
			);
		}

		cartItem.quantity = quantity;
		await cartItem.save();

		return Response.json({ message: "Item quantity updated" });
	} catch (error) {
		const message = handleError(error);
		console.error(message);

		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default updateCartItem;
