import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import s3 from "@/lib/s3";
import FoodModel from "@/models/food";
import { withAdminAuth } from "@/utils/with-admin-auth";
import { after } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

async function deleteFood(_: Request, { params }: { params: Promise<{ foodId: string }> }) {
	try {
		const { foodId } = await params;

		if (!foodId) {
			return Response.json({ message: "Food ID is required" }, { status: 400 });
		}

		await connectMongo();

		const food = await FoodModel.findByIdAndDelete(foodId);
		if (!food) {
			return Response.json({ message: "Food not found" }, { status: 404 });
		}

		if (food) {
			const oldImageUrl = food.image;
			const oldImageUrlArray = oldImageUrl.split("/");
			const oldImageName = oldImageUrlArray[oldImageUrlArray.length - 1];
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

		return Response.json({ message: "Food deleted successfully" }, { status: 200 });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(deleteFood);
