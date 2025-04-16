import connectMongo from "@/lib/connectMongo";
import CategoriesDisplay from "./_ccomponents/categories-display";
import CategoryModel from "@/models/category";
import SubCategoryModel from "@/models/sub-category";
import { omit, map } from "lodash";

async function CategoriesPage() {
	await connectMongo();

	const categories = await CategoryModel.find({});
	const data = [];
	for (const category of categories) {
		const subCategories = await SubCategoryModel.find({ _categoryId: category._id });
		data.push({
			...omit(category.toObject(), [
				"_creatorId",
				"createdAt",
				"updatedAt",
				"slug",
			]),
			subcategories: map(subCategories, (subCategory) =>
				omit(subCategory.toObject(), [
					"_creatorId",
					"_categoryId",
					"createdAt",
					"updatedAt",
					"slug",
				])
			),
		});
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					Our Menu Categories
				</h1>

				<CategoriesDisplay categories={data} />
			</div>
		</div>
	);
}

export default CategoriesPage;
