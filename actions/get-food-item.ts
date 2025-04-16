"use server";
import "server-only";

import connectMongo from "@/lib/connectMongo";
import FoodModel from "@/models/food";

type ParamType = {
	limit?: number;
	page?: number;
	paginate?: boolean;
	timeChoice?: "breakfast" | "lunch" | "dinner";
	sortBy?: "price" | "average_rating";
	order?: "asc" | "desc";
	available?: boolean;
	price?: { min?: number; max?: number };
	query?: string;
	category?: string;
	subCategory?: string;
};

async function getFoodItems({
	limit,
	page,
	paginate,
	timeChoice,
	sortBy,
	order,
	available = true,
	price,
	query: queryParam,
	category,
	subCategory,
}: ParamType) {
	await connectMongo();

	const query = {
		available,
		...(timeChoice && { timeChoice }),
		...(price && {
			price: {
				...(price.min && { $gte: price.min }),
				...(price.max && { $lte: price.max }),
			},
		}),
		...(queryParam && {
			$or: [
				{ name: { $regex: queryParam, $options: "i" } },
				{ short_desc: { $regex: queryParam, $options: "i" } },
				{ full_desc: { $regex: queryParam, $options: "i" } },
			],
		}),
		...(category && { _categoryIds: { $in: [category] } }),
		...(subCategory && { _subCategoryIds: { $in: [subCategory] } }),
	};

	if (!paginate) {
		let queryBuilder = FoodModel.find(query);

		if (sortBy) {
			queryBuilder = queryBuilder.sort({ [sortBy]: order || "asc" });
		}
		const foodItems = await queryBuilder.limit(limit || 10).lean();

		if (!foodItems || !foodItems.length) return null;

		foodItems.forEach((item) => {
			item._id = item._id.toString();
		});

		return foodItems;
	} else {
		const options = {
			page: page || 1,
			limit: limit || 10,
			...(sortBy && { sort: { [sortBy]: order || "asc" } }),
		};

		// const query = timeChoice ? { timeChoice } : {};

		const foodItems = await FoodModel.paginate(query, options);

		return foodItems;
	}
}

export default getFoodItems;
