import connectMongo from "@/lib/connectMongo";
import NotificationsDispaly from "./_components/notifications-display";
import { auth } from "@/auth";
import NotificationModel from "@/models/notifications";

async function NotificationsPage() {
	await connectMongo();
	const session = await auth();
	const userId = session?.user.id;

	return (
		<div className="min-h-[100dvh] p-4 max-w-3xl mx-auto pb-10">
			<h1 className="text-2xl font-bold mb-6">Notifications</h1>

			<NotificationsDispaly />
		</div>
	);
}

export default NotificationsPage;
