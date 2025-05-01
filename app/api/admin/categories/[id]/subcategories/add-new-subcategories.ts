import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import getImage from "@/lib/getImageBlurUrl";
import { handleError } from "@/lib/handleError";
import CategoryModel from "@/models/category";
import SubCategoryModel from "@/models/sub-category";
import { withAdminAuth } from "@/utils/with-admin-auth";
async function addNewSubCategory(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const session = await auth();
		const formData = await req.json();
		const { name, image } = formData;

		const categoryId = (await params).id;

		if (!name)
			return Response.json(
				{ message: "Enter subcategory name" },
				{ status: 400 }
			);

		if (!/^[a-zA-Z0-9\s]+$/.test(name))
			return Response.json(
				{
					message: "Subcategory name can only contain letters, numbers and spaces",
				},
				{ status: 400 }
			);

		if (!image) return Response.json({ message: "No file specified" }, { status: 400 });

		const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`;
		const creator = session?.user.id;

		const { base64 } = await getImage(imageUrl);

		await connectMongo();

		const category = await CategoryModel.findById(categoryId);

		if (!category)
			return Response.json({ message: "Category not found" }, { status: 404 });

		const subcategory = await SubCategoryModel.create({
			cover_image: imageUrl,
			name: name.toLowerCase(),
			_creatorId: creator,
			coverImagePlaceholder: base64,
			_categoryId: categoryId,
		});

		return Response.json({ message: "Success", subcategoryId: subcategory.id });
	} catch (error: unknown) {
		const message = handleError(error);
		return Response.json({ success: false, message }, { status: 500 });
	}
}

export default withAdminAuth(addNewSubCategory);
