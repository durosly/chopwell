import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CategoryModel from "@/models/category";
import { NextRequest } from "next/server";

async function getCategories(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const newPage = searchParams.get("page");

		if (!Number(newPage)) {
			return Response.json(
				{ status: false, message: "Page can only be a number" },
				{ status: 400 }
			);
		}

		const page = Number(newPage);

		await connectMongo();

		const categories = await CategoryModel.paginate(
			{},
			{
				page,
				sort: "-createdAt",
				populate: { path: "_creatorId", select: ["_id", "firstname"] },
			}
		);

		return Response.json(categories);
	} catch (error: unknown) {
		const message = handleError(error);
		return Response.json({ success: false, message }, { status: 500 });
	}
}

export default getCategories;
