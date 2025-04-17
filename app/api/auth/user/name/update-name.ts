import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import UserModel from "@/models/user";
import { z } from "zod";
import { withAuth } from "@/utils/with-user-auth";

const nameSchema = z.object({
	firstname: z
		.string()
		.min(1, "firstname cannot be empty")
		.max(50, "firstname cannot exceed 50 characters")
		.transform((val) => val.trim().replace(/[<>]/g, "")),
	lastname: z
		.string()
		.min(1, "lastname cannot be empty")
		.max(50, "lastname cannot exceed 50 characters")
		.transform((val) => val.trim().replace(/[<>]/g, "")),
});

async function updateUsername(request: Request) {
	try {
		const data = await request.json();
		const validatedData = nameSchema.safeParse(data);

		if (!validatedData.success) {
			return Response.json(
				{ message: validatedData.error.errors[0].message },
				{ status: 400 }
			);
		}

		const session = await auth();
		const userId = session?.user.id;

		if (!userId) return Response.json({ message: "Unathorized" }, { status: 401 });

		await connectMongo();
		await UserModel.findByIdAndUpdate(userId, {
			firstname: validatedData.data.firstname,
			lastname: validatedData.data.lastname,
		});

		return Response.json({ message: "Name updated successfully" });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return Response.json({ message: error.errors[0].message }, { status: 400 });
		}
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(updateUsername);
