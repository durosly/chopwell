import connectMongo from "@/lib/connectMongo";
import CategoriesDisplay from "./_ccomponents/categories-display";
import CategoryModel from "@/models/category";
import SubCategoryModel from "@/models/sub-category";
import { map } from "lodash";
import { Document } from "mongoose";

interface CategoryDocument extends Document {
	_id: string;
	name: string;
	cover_image: string;
}

interface SubCategoryDocument extends Document {
	_id: string;
	name: string;
	cover_image: string;
}

async function CategoriesPage() {
	await connectMongo();

	const categories = await CategoryModel.find({});
	const data = [];
	for (const category of categories) {
		const subCategories = await SubCategoryModel.find({ _categoryId: category._id });
		data.push({
			_id: (category as CategoryDocument)._id.toString(),
			name: (category as CategoryDocument).name,
			cover_image: (category as CategoryDocument).cover_image,
			subcategories: map(subCategories, (subCategory) => ({
				_id: (subCategory as SubCategoryDocument)._id.toString(),
				name: (subCategory as SubCategoryDocument).name,
				cover_image: (subCategory as SubCategoryDocument).cover_image,
			})),
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
