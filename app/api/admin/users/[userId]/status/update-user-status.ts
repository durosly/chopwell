import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import UserModel from "@/models/user";
import { withAdminAuth } from "@/utils/with-admin-auth";

async function updateUserStatus(req: Request, { params }: { params: Promise<{ userId: string }> }) {
	const { userId } = await params;
	try {
		const session = await auth();
		if (!session?.user) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { disabled } = await req.json();

		if (!userId || typeof disabled !== "boolean") {
			return Response.json(
				{ error: "Invalid request parameters" },
				{ status: 400 }
			);
		}

		await connectMongo();
		const user = await UserModel.findByIdAndUpdate(
			userId,
			{ disabled },
			{ new: true }
		).select("-password");

		if (!user) {
			return Response.json({ error: "User not found" }, { status: 404 });
		}

		return Response.json({ message: "User status updated successfully" });
	} catch (error) {
		console.error("Error updating user status:", error);
		const message = handleError(error);
		return Response.json({ error: message }, { status: 500 });
	}
}

export default withAdminAuth(updateUserStatus);
