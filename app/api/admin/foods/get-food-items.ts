import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import FoodModel from "@/models/food";
import { NextRequest } from "next/server";

async function getFoodItems(request: NextRequest) {
	try {
		const { searchParams } = request.nextUrl;
		const query = searchParams.get("query");
		const category = searchParams.get("category");
		const subCategory = searchParams.get("subCategory");
		const page = searchParams.get("page");
		const limit = searchParams.get("limit");

		await connectMongo();

		const dbQukery = {
			...(query && { name: { $regex: query, $options: "i" } }),
			...(category && { _categoryId: category }),
			...(subCategory && { _subCategoryId: subCategory }),
		};

		const options = {
			limit: limit ? parseInt(limit) : 10,
			page: page ? parseInt(page) : 1,
			sort: {
				createdAt: -1,
			},
			populate: "_categoryId _creatorId",
		};

		const foodItems = await FoodModel.paginate(dbQukery, options);

		// console.log(foodItems);

		return Response.json(
			{ message: "Products fetched successfully", data: foodItems },
			{ status: 200 }
		);
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default getFoodItems;
