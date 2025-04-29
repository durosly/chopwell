import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import getImage from "@/lib/getImageBlurUrl";
import { handleError } from "@/lib/handleError";
import CategoryModel from "@/models/category";
import { withAdminAuth } from "@/utils/with-admin-auth";
async function addNewCategory(req: Request) {
	try {
		const session = await auth();
		const formData = await req.json();
		const { name, image } = formData;

		if (!name)
			return Response.json({ message: "Enter category name" }, { status: 400 });

		if (!image) return Response.json({ message: "No file specified" }, { status: 400 });

		const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`;
		const creator = session?.user.id;

		const { base64 } = await getImage(imageUrl);

		await connectMongo();

		const category = await CategoryModel.create({
			cover_image: imageUrl,
			name,
			_creatorId: creator,
			coverImagePlaceholder: base64,
		});

		return Response.json({ message: "Success", categoryId: category.id });
	} catch (error: unknown) {
		const message = handleError(error);
		return Response.json({ success: false, message }, { status: 500 });
	}
}

export default withAdminAuth(addNewCategory);
