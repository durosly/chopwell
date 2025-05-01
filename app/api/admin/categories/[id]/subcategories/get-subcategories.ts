import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import SubCategoryModel from "@/models/sub-category";
import { NextRequest } from "next/server";

async function getSubCategories(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const newPage = searchParams.get("page");
		const q = searchParams.get("query");
		const categoryId = (await params).id;
		if (!Number(newPage)) {
			return Response.json(
				{ status: false, message: "Page can only be a number" },
				{ status: 400 }
			);
		}

		const page = Number(newPage);

		const query: {
			name?: string | { $regex: string; $options: string };
			_categoryId?: string;
		} = {};

		if (!categoryId) {
			return Response.json(
				{ status: false, message: "Category ID is required" },
				{ status: 400 }
			);
		}

		query._categoryId = categoryId;

		if (!!q && q !== "all") {
			query.name = { $regex: q, $options: "i" };
		}

		await connectMongo();

		const subcategories = await SubCategoryModel.paginate(query, {
			page,
			sort: "-createdAt",
			populate: {
				path: "_creatorId",
				select: ["_id", "firstname", "lastname"],
			},
			lean: true,
			leanWithId: true, // This option is required to return the _id field as a string
		});

		return Response.json(subcategories);
	} catch (error: unknown) {
		const message = handleError(error);
		return Response.json({ success: false, message }, { status: 500 });
	}
}

export default getSubCategories;
