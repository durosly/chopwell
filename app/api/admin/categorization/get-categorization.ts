import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CategoryModel from "@/models/category";
import SubCategoryModel from "@/models/sub-category";

async function getCategorization() {
	try {
		await connectMongo();

		const categories = await CategoryModel.find({});
		const subcategories = await SubCategoryModel.find({});

		return Response.json({ categories, subcategories });
	} catch (error: unknown) {
		const message = handleError(error);
		return Response.json({ success: false, message }, { status: 500 });
	}
}

export default getCategorization;
