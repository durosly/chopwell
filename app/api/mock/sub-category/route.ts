import connectMongo from "@/lib/connectMongo";
import CategoryModel from "@/models/category";
import SubCategoryModel from "@/models/sub-category";
import UserModel from "@/models/user";
import axios from "axios";

const dummySubCategory = [
	{
		name: "Light and Tasty Appetizers",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/appetizers.jpg",
	},
	{
		name: "Signature Gourmet Burgers",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/burgers.jpg",
	},
	{
		name: "Creamy and Cheesy Pasta",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/pasta.jpg",
	},
	{
		name: "Stone Oven Baked Pizza",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/pizza.jpg",
	},
	{
		name: "Fresh and Crunchy Salads",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/salads.jpg",
	},
	{
		name: "Sweet and Decadent Desserts",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/desserts.jpg",
	},
	{
		name: "Chilled and Refreshing Beverages",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/beverages.jpg",
	},
	{
		name: "Freshly Cooked Seafood Delights",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/seafood.jpg",
	},
	{
		name: "Flame Grilled Meat Specialties",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/grilled.jpg",
	},
	{
		name: "Warm and Hearty Soups",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/soups.jpg",
	},
];

async function createMockSubCategory() {
	try {
		await connectMongo();

		await SubCategoryModel.deleteMany({});
		const adminUser = await UserModel.findOne({ type: "admin" });

		if (!adminUser) {
			return Response.json({ message: "No admin user found" }, { status: 404 });
		}

		const categories = await CategoryModel.find({});

		if (!categories.length) {
			return Response.json({ message: "No categories found" }, { status: 404 });
		}

		const categoryIds = categories.map((category) => category._id);
		const photos = await axios("https://picsum.photos/v2/list");
		const photosData = photos.data.map((p: { download_url: string }) =>
			p.download_url.replace(/\/\d+\/\d+$/, "")
		);

		const newSubCategories = dummySubCategory.map((subCategory, index) => {
			const randomCategoryId =
				categoryIds[Math.floor(Math.random() * categoryIds.length)];
			return {
				...subCategory,
				_creatorId: adminUser?._id,
				cover_image: photosData[index],
				_categoryId: randomCategoryId,
				slug: subCategory.name.toLowerCase().replace(/ /g, "-"),
			};
		});

		await SubCategoryModel.insertMany(newSubCategories);

		return Response.json({ message: "New sub categories inserted" });
	} catch (error: unknown) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}

		return Response.json({ message }, { status: 500 });
	}
}

export { createMockSubCategory as GET, createMockSubCategory as POST };
