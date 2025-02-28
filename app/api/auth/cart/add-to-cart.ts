import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import CartModel from "@/models/cart";
import FoodModel from "@/models/food";

async function addToCart(req: Request) {
	try {
		await connectMongo();

		const { foodId, sessionId } = await req.json();
		const session = await auth();
		const userId = session?.user.id;

		const foodItem = await FoodModel.findById(foodId);
		if (!foodItem)
			return Response.json({ message: "Food item not found" }, { status: 404 });

		const filter = userId ? { userId } : { sessionId };

		const cart = await CartModel.findOne(filter);

		if (!cart) {
			await CartModel.create({
				...filter,
				group: [
					{ title: "Cart group 1", items: [{ foodId, quantity: 1 }] },
				],
			});
		} else {
			// check if the food item is already in any of the cart groups
			const groupIndex = cart.group.findIndex(
				(group: { items: { foodId: string }[] }) =>
					group.items.some(
						(item: { foodId: string }) =>
							item.foodId.toString() === foodId
					)
			);
			if (groupIndex === -1) {
				// if not, add it to the first group
				cart.group[0].items.push({ foodId, quantity: 1 });
			} else {
				// if it is, increase the quantity
				const itemIndex = cart.group[groupIndex].items.findIndex(
					(item: { foodId: string }) =>
						item.foodId.toString() === foodId
				);

				if (itemIndex === -1) {
					return Response.json(
						{ message: "Cart error occured" },
						{ status: 400 }
					);
				}

				cart.group[groupIndex].items[itemIndex].quantity++;
			}

			await cart.save();
		}

		return Response.json({ message: "Food item added to cart" });
	} catch (error) {
		console.log("Error in add-to-fav", error);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default addToCart;
