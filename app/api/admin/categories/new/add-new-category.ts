import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import getImage from "@/lib/getImageBlurUrl";
import { handleError } from "@/lib/handleError";
import s3Client from "@/lib/s3";
import CategoryModel from "@/models/category";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Define a schema for file validation
const fileSchema = z.object({
	name: z.string(),
	size: z.number().max(MAX_FILE_SIZE, "File size exceeds 5MB"),
	type: z.string().regex(/^image\/(jpeg|png|gif|webp)$/, "Invalid file type"),
});

async function addNewCategory(req: NextRequest) {
	try {
		const session = await auth();
		const formData = await req.formData();
		const file = formData.getAll("categoryCover")[0];
		const categoryName = formData.get("categoryName");

		if (!categoryName)
			return Response.json({ message: "Enter category name" }, { status: 400 });

		if (!file || !(file instanceof File))
			return Response.json({ message: "No file specified" }, { status: 400 });

		// Validate file properties
		const validationResult = fileSchema.safeParse({
			name: file?.name,
			size: file?.size,
			type: file?.type,
		});

		if (!validationResult.success) {
			return Response.json(
				{
					message: validationResult.error.errors
						.map((e) => e.message)
						.join(", "),
				},
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		const timestamp = Date.now();
		const newFilename = timestamp + "-" + file.name.replace(/ /g, "_");

		// Convert File to Buffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// Upload file to S3
		await s3Client.send(
			new PutObjectCommand({
				Bucket: process.env.S3_BUCKET_NAME,
				Key: newFilename,
				Body: buffer,
				ContentType: file.type,
			})
		);

		const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${newFilename}`;
		const creator = session?.user.id;

		const { base64 } = await getImage(imageUrl);

		await connectMongo();

		const category = await CategoryModel.create({
			cover_image: imageUrl,
			name: categoryName,
			_creatorId: creator,
			coverImagePlaceholder: base64,
		});

		return Response.json({ message: "Success", categoryId: category.id });
	} catch (error: unknown) {
		const message = handleError(error);
		return Response.json({ success: false, message }, { status: 500 });
	}
}

export default addNewCategory;
