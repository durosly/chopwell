import connectMongo from "@/lib/connectMongo";
import CategoryModel from "@/models/category";
import FoodModel from "@/models/food";
import SubCategoryModel from "@/models/sub-category";
import { notFound } from "next/navigation";
import AddNewSubcategory from "./_components/add-new-subcategory";
import SubCategoryList from "./_components/sub-category-list";

async function CategoryDetailsPage({ params }: { params: Promise<{ categoryId: string }> }) {
	const categoryId = (await params).categoryId;

	await connectMongo();

	const category = await CategoryModel.findById(categoryId);

	if (!category) {
		return notFound();
	}

	const subcategories = await SubCategoryModel.find({ _categoryId: categoryId });
	const foods = await FoodModel.find({ _categoryId: categoryId });

	return (
		<div className="space-y-10">
			{/* Category Stats */}

			<div className="stats stats-vertical md:stats-horizontal w-full mb-8 bg-base-100">
				<div className="stat">
					<div className="stat-title">Category Name</div>
					<div className="stat-value text-primary">
						{category.name}
					</div>
					{/* <div className="stat-desc">
								{categoryData.description}
							</div> */}
				</div>
				<div className="stat">
					<div className="stat-title">Total Foods</div>
					<div className="stat-value">{foods.length}</div>
					<div className="stat-desc">Across all subcategories</div>
				</div>
				<div className="stat">
					<div className="stat-title">Subcategories</div>
					<div className="stat-value">{subcategories.length}</div>
					<div className="stat-desc">Active subcategories</div>
				</div>
			</div>

			{/* Add Subcategory Button */}
			<AddNewSubcategory categoryId={categoryId} />

			{/* Subcategories Table */}
			<SubCategoryList categoryId={categoryId} />
		</div>
	);
}

export default CategoryDetailsPage;
