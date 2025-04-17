import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import NotificationModel from "@/models/notifications";
import { withAuth } from "@/utils/with-user-auth";

async function getNotifications() {
	try {
		const session = await auth();
		const userId = session?.user.id;

		if (!userId) return Response.json({ message: "Unathorized" }, { status: 401 });

		await connectMongo();
		const notifications = await NotificationModel.find({ _userId: userId })
			.sort("-createdAt")
			.limit(10);

		return Response.json({ notifications });
	} catch (error) {
		const message = handleError(error);

		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(getNotifications);
