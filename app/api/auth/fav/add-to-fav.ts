import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import FavouriteModel from "@/models/favourite";
import FoodModel from "@/models/food";

async function addToFav(req: Request) {
	try {
		await connectMongo();

		const { foodId, sessionId } = await req.json();
		const session = await auth();
		const userId = session?.user.id;

		const foodItem = await FoodModel.findById(foodId);
		if (!foodItem)
			return Response.json({ message: "Food item not found" }, { status: 404 });

		const filter = userId ? { userId } : { sessionId };

		const fav = await FavouriteModel.findOne(filter);

		if (!fav) {
			const newFav = new FavouriteModel(filter);
			newFav.items.push(foodId);
			await newFav.save();
		} else {
			// check if the food item is already in the fav list
			const isFoodItemExist = fav.items.find(
				(item) => item.toString() === foodId
			);
			if (isFoodItemExist)
				return Response.json(
					{ message: "Food item already in the list" },
					{ status: 400 }
				);

			fav.items.push(foodId);
			await fav.save();
		}

		return Response.json({ message: "Food item added to favourite" });
	} catch (error) {
		console.log("Error in add-to-fav", error);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default addToFav;
