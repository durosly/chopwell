import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import CartModel from "@/models/cart";
import CartItemModel from "@/models/cart-item";
import CartItemGroupModel from "@/models/cart-item-group";
import FoodModel from "@/models/food";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";

async function addToCart(req: Request) {
	try {
		await connectMongo();

		const { foodId } = await req.json();

		let sessionId = "";
		const session = await auth();
		const userId = session?.user.id;

		if (!userId) {
			sessionId = await getAnonymousSessionId({ get: false });
		}

		if (!sessionId && !userId) {
			return Response.json(
				{ message: "Error creating session. Please, log in to continue" },
				{ status: 500 }
			);
		}

		const foodItem = await FoodModel.findById(foodId);
		if (!foodItem)
			return Response.json({ message: "Food item not found" }, { status: 404 });

		const filter = userId ? { userId } : { sessionId };

		const cart = await CartModel.findOne(filter);

		if (!cart) {
			const newCart = await CartModel.create(filter);

			const newCartGroup = await CartItemGroupModel.create({
				title: "My Cart",
				cartId: newCart._id,
			});

			await CartItemModel.create({
				foodId,
				groupId: newCartGroup._id,
				cartId: newCart._id,
			});
		} else {
			const cartGroup = await CartItemGroupModel.findOne({
				cartId: cart._id,
			}).sort({ createdAt: -1 });

			if (!cartGroup) {
				const newCartGroup = await CartItemGroupModel.create({
					title: "My Cart",
					cartId: cart._id,
				});

				await CartItemModel.create({
					foodId,
					groupId: newCartGroup._id,
					cartId: cart._id,
				});
			} else {
				const cartItem = await CartItemModel.findOne({
					foodId,
					groupId: cartGroup._id,
				});

				if (cartItem) {
					cartItem.quantity += 1;
					await cartItem.save();
				} else {
					await CartItemModel.create({
						foodId,
						groupId: cartGroup._id,
						cartId: cart._id,
					});
				}
			}
		}

		return Response.json({ message: "Food item added to cart" });
	} catch (error) {
		console.log("Error in add-to-fav", error);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default addToCart;
