import connectMongo from "@/lib/connectMongo";
import CategoryModel from "@/models/category";
import UserModel from "@/models/user";
import axios from "axios";

const dummyCategory = [
	{
		name: "Appetizers",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/appetizers.jpg",
	},
	{
		name: "Burgers",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/burgers.jpg",
	},
	{
		name: "Pasta",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/pasta.jpg",
	},
	{
		name: "Pizza",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/pizza.jpg",
	},
	{
		name: "Salads",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/salads.jpg",
	},
	{
		name: "Desserts",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/desserts.jpg",
	},
	{
		name: "Beverages",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/beverages.jpg",
	},
	{
		name: "Seafood",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/seafood.jpg",
	},
	{
		name: "Grilled",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/grilled.jpg",
	},
	{
		name: "Soups",
		_creatorId: "65f9a3b1c7e2a6d5b9f0e123",
		cover_image: "https://example.com/images/soups.jpg",
	},
];

async function createMockCategory() {
	try {
		await connectMongo();

		await CategoryModel.deleteMany({});
		const adminUser = await UserModel.findOne({ type: "admin" });

		if (!adminUser) {
			return Response.json({ message: "No admin user found" }, { status: 404 });
		}

		const photos = await axios("https://picsum.photos/v2/list");

		const newCategories = dummyCategory.map((category, index) => {
			return {
				...category,
				_creatorId: adminUser?._id,
				cover_image: photos.data[index].download_url,
			};
		});

		await CategoryModel.insertMany(newCategories);

		return Response.json({ message: "New categories inserted" });
	} catch (error: unknown) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}

		return Response.json({ message }, { status: 500 });
	}
}

export { createMockCategory as GET, createMockCategory as POST };
