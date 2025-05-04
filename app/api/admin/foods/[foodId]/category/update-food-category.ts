import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import FoodModel from "@/models/food";
import { adminUpdateFoodCategorySchema } from "@/schema/admin-update-food-category-schema";
import { withAdminAuth } from "@/utils/with-admin-auth";

async function updateFoodCategory(
	request: Request,
	{ params }: { params: Promise<{ foodId: string }> }
) {
	try {
		const data = await request.json();

		const { foodId } = await params;
		const validatedData = adminUpdateFoodCategorySchema.safeParse(data);
		if (!validatedData.success) {
			return Response.json(
				{ message: validatedData.error.errors[0].message },
				{ status: 400 }
			);
		}

		await connectMongo();

		const food = await FoodModel.findByIdAndUpdate(foodId, validatedData.data, {
			new: true,
		});
		if (!food) {
			return Response.json({ message: "Food not found" }, { status: 404 });
		}

		return Response.json({ message: "Food updated successfully" }, { status: 200 });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(updateFoodCategory);
