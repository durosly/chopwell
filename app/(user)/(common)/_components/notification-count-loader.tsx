import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import NotificationModel from "@/models/notifications";
import NotificationCountHandler from "./notification-count-handler";

async function NotificationCountLoader() {
	await connectMongo();
	const session = await auth();
	const userId = session?.user.id;
	const notifications = await NotificationModel.find({ _userId: userId, isRead: false });

	return <NotificationCountHandler initialCount={notifications.length} />;
}

export default NotificationCountLoader;
