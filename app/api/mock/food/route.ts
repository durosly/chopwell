import connectMongo from "@/lib/connectMongo";
import CategoryModel from "@/models/category";
import FoodModel from "@/models/food";
import UserModel from "@/models/user";
import { faker } from "@faker-js/faker";
import axios from "axios";

async function createMockFood() {
	try {
		await connectMongo();

		await FoodModel.deleteMany({});
		const adminUser = await UserModel.findOne({ type: "admin" });

		if (!adminUser) {
			return Response.json({ message: "No admin user found" }, { status: 404 });
		}

		const categories = await CategoryModel.find({});
		if (!categories || !categories.length) {
			return Response.json({ message: "No categories found" }, { status: 404 });
		}

		const categoryIds = categories.map((c) => c.id);

		const photos = await axios("https://picsum.photos/v2/list");
		const photosData = photos.data.map((p: { download_url: string }) => p.download_url.replace(/\/\d+\/\d+$/, ""));

		const count = 100;

		const newFoodItems = Array.from({ length: count }, () => {
			return {
				name: faker.commerce.productName(),
				_categoryIds: [faker.helpers.arrayElement(categoryIds)], // Assign random category ID
				image: faker.helpers.arrayElement(photosData),
				available: faker.datatype.boolean(),
				price: faker.number.int({ min: 1000, max: 10000 }),
				short_desc: faker.commerce.productDescription(),
				full_desc: faker.lorem.paragraph(),
				number_of_item: faker.number.int({ min: 5, max: 50 }),
				_creatorId: adminUser._id,
				timeChoice: faker.helpers.arrayElement(["breakfast", "lunch", "dinner"]),
				type: faker.helpers.arrayElement(["food", "drink", "combo"]),
				average_rating: faker.number.float({
					min: 0,
					max: 5,
					multipleOf: 0.1,
				}), // Random float between 0 and 5
				preparation_time: faker.number.int({ min: 1, max: 60 }), // Random int between 1 and 60
			};
		});

		await FoodModel.insertMany(newFoodItems);

		return Response.json({ message: "New foods inserted" });
	} catch (error: unknown) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}

		return Response.json({ message }, { status: 500 });
	}
}

export { createMockFood as GET, createMockFood as POST };
