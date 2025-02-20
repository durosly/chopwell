import connectMongo from "@/lib/connectMongo";
import FoodModel from "@/models/food";

type ParamType = {
	limit?: number;
	page?: number;
	paginate?: boolean;
	timeChoice?: "breakfast" | "lunch" | "dinner";
	sortBy?: "price" | "average_rating";
	order?: "asc" | "desc";
};

async function getFoodItems({ limit, page, paginate, timeChoice, sortBy, order }: ParamType) {
	await connectMongo();

	const query = timeChoice ? { timeChoice } : {};
	if (!paginate) {
		const foodItems = await FoodModel.find(query)
			.sort({ [sortBy || "price"]: order || "asc" })
			.limit(limit || 10)
			.lean();

		if (!foodItems || !foodItems.length) return null;

		foodItems.forEach((item) => {
			item._id = item._id.toString();
		});

		return foodItems;
	} else {
		const options = {
			page: page || 1,
			limit: limit || 10,
			sort: { [sortBy || "price"]: order || "asc" },
		};

		// const query = timeChoice ? { timeChoice } : {};

		const foodItems = await FoodModel.paginate(query, options);

		return foodItems;
	}
}

export default getFoodItems;
