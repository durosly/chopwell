import { auth } from "@/auth";
import { handleError } from "@/lib/handleError";
import NotificationModel from "@/models/notifications";

async function markUserNotificationAsRead(
	_: Request,
	{ params }: { params: Promise<{ notificationId: string }> }
) {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return Response.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { notificationId } = await params;

		await NotificationModel.findOneAndUpdate(
			{ _userId: userId, _id: notificationId },
			{ isRead: true }
		);

		return Response.json({ message: "Notification marked as read" });
	} catch (error) {
		console.error(error);
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default markUserNotificationAsRead;
