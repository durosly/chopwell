import connectMongo from "@/lib/connectMongo";
import getImage from "@/lib/getImageBlurUrl";
import { handleError } from "@/lib/handleError";
import FoodModel from "@/models/food";
import s3 from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { withAdminAuth } from "@/utils/with-admin-auth";
import { after } from "next/server";

async function updateFoodImage(
	request: Request,
	{ params }: { params: Promise<{ foodId: string }> }
) {
	try {
		const { image } = await request.json();

		const { foodId } = await params;

		if (!image) {
			return Response.json({ message: "Image is required" }, { status: 400 });
		}

		await connectMongo();

		const existingFood = await FoodModel.findById(foodId);
		if (!existingFood) {
			return Response.json({ message: "Food not found" }, { status: 404 });
		}

		const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`;
		const { base64 } = await getImage(imageUrl);

		await FoodModel.findByIdAndUpdate(foodId, {
			image: imageUrl,
			coverImagePlaceholder: base64,
		});

		// Delete old image from s3
		// TODOL: split url from existingFood.image and delete the image from s3
		const oldImageUrl = existingFood.image;
		const oldImageUrlArray = oldImageUrl.split("/");
		const oldImageName = oldImageUrlArray[oldImageUrlArray.length - 1];

		if (oldImageName) {
			after(() => {
				// Execute after the handler is finished

				(async () => {
					await s3.send(
						new DeleteObjectCommand({
							Bucket: process.env.S3_BUCKET_NAME!,
							Key: oldImageName,
						})
					);
				})();
				console.log("...Deleted image after handler has finished...");
			});
		}

		return Response.json({ message: "Food updated successfully" }, { status: 200 });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(updateFoodImage);
