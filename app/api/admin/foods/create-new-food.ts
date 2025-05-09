import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import getImage from "@/lib/getImageBlurUrl";
import { handleError } from "@/lib/handleError";
import FoodModel from "@/models/food";
import { foodFormSchema } from "@/schema/admin-create-food-schema";
import { withAdminAuth } from "@/utils/with-admin-auth";

async function createNewFoodItem(request: Request) {
	try {
		const body = await request.json();

		const validatedBody = foodFormSchema.safeParse(body);

		if (!validatedBody.success) {
			console.log(validatedBody.error.errors);
			return Response.json(
				{ message: validatedBody.error.errors[0].message },
				{ status: 400 }
			);
		}

		await connectMongo();

		const defaultImage = process.env.NEXT_PUBLIC_URL + "/images/default.jpg";

		const { base64 } = await getImage(defaultImage);

		const session = await auth();
		const creator = session?.user.id;

		const food = await FoodModel.create({
			...validatedBody.data,
			image: defaultImage,
			coverImagePlaceholder: base64,
			_creatorId: creator,
		});

		return Response.json(
			{ message: "Food created successfully", foodId: food._id },
			{ status: 201 }
		);
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(createNewFoodItem);
