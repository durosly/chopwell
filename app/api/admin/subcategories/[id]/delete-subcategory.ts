import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import { withAdminAuth } from "@/utils/with-admin-auth";
import type { NextRequest } from "next/server";
import s3Client from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import FoodModel from "@/models/food";
import SubCategoryModel from "@/models/sub-category";

async function deleteSubCategory(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const session = await auth();
		const subCategoryId = (await params).id;

		if (!subCategoryId) {
			return Response.json(
				{ message: "Sub-category ID is required" },
				{ status: 400 }
			);
		}

		await connectMongo();

		const subCategory = await SubCategoryModel.findById(subCategoryId);

		if (!subCategory) {
			return Response.json(
				{ message: "Sub-category not found" },
				{ status: 404 }
			);
		}

		// Check if the user is the creator of the category

		if (session?.user.type !== "admin") {
			if (subCategory._creatorId.toString() !== session?.user.id) {
				return Response.json(
					{
						message: "You are not authorized to delete this sub-category",
					},
					{ status: 403 }
				);
			}
		}

		await SubCategoryModel.findByIdAndDelete(subCategoryId);

		// TODO: Delete category cover image from storage(s3)
		const imageId = subCategory?.cover_image;
		if (imageId) {
			// TODO: Check if the image is a placeholder image. Ensure to remove this in the future.
			if (!imageId.startsWith("https://picsum.photos")) {
				const command = new DeleteObjectCommand({
					Bucket: process.env.S3_BUCKET_NAME,
					Key: imageId,
				});

				await s3Client.send(command);
			}
		}

		await FoodModel.deleteMany({ _subCategoryId: subCategoryId });

		return Response.json({ message: "Sub-category deleted successfully" });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(deleteSubCategory);
