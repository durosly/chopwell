import UserModel from "@/models/user";
import connectMongo from "@/lib/connectMongo";
import { z } from "zod";
import { auth } from "@/auth";
import { handleError } from "@/lib/handleError";
import { withAuth } from "@/utils/with-user-auth";

const emailSchema = z.object({
	email: z.string().email("Invalid email address"),
});

async function updateEmail(request: Request) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const { email } = emailSchema.parse(body);

		await connectMongo();
		const user = await UserModel.findById(session.user.id);
		if (!user) {
			return Response.json({ error: "User not found" }, { status: 404 });
		}

		// Check if email is already taken
		const existingUser = await UserModel.findOne({ email });
		if (existingUser && existingUser._id.toString() !== session.user.id) {
			return Response.json({ error: "Email is already taken" }, { status: 400 });
		}

		user.email = email;
		await user.save();

		return Response.json({ message: "Email updated successfully" });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(updateEmail);
