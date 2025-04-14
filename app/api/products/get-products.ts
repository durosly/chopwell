import getFoodItems from "@/actions/get-food-item";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import { NextRequest } from "next/server";

async function getProducts(request: NextRequest) {
	try {
		const { searchParams } = request.nextUrl;
		const query = searchParams.get("query");
		const minPrice = searchParams.get("minPrice");
		const maxPrice = searchParams.get("maxPrice");
		const mealTime = searchParams.get("mealTime") as "breakfast" | "lunch" | "dinner";
		const sortBy = searchParams.get("sortBy") as
			| "relevance"
			| "rating"
			| "price-asc"
			| "price-desc";
		const page = searchParams.get("page");

		await connectMongo();

		let order: "asc" | "desc" | undefined = "asc";
		let sort: "price" | "average_rating" | undefined = "price";
		const timeChoice: "breakfast" | "lunch" | "dinner" | undefined = mealTime;

		if (sortBy === "price-asc") {
			order = "asc";
			sort = "price";
		}

		if (sortBy === "price-desc") {
			order = "desc";
			sort = "price";
		}

		if (sortBy === "rating") {
			order = "desc";
			sort = "average_rating";
		}

		if (sortBy === "relevance") {
			order = undefined;
			sort = undefined;
		}

		const queryParam = query ? query : undefined;

		const minPriceInt = minPrice ? parseInt(minPrice) : 10;
		const maxPriceInt = maxPrice ? parseInt(maxPrice) : 100_000;

		const foodItems = await getFoodItems({
			sortBy: sort,
			order,
			page: page ? parseInt(page) : 1,
			paginate: true,
			price: { min: minPriceInt, max: maxPriceInt },
			timeChoice,
			query: queryParam,
		});

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

export default getProducts;
