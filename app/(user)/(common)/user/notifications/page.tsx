import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import NotificationModel from "@/models/notifications";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotificationsDispaly from "./_components/notifications-display";

async function NotificationsPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["notifications"],
		queryFn: async () => {
			await connectMongo();
			const session = await auth();
			const userId = session?.user.id;

			const notifications = await NotificationModel.find({
				_userId: userId,
			})
				.sort("-createdAt")
				.limit(10);
			return { notifications: JSON.parse(JSON.stringify(notifications)) };
		},
	});

	return (
		<div className="min-h-[100dvh] p-4 max-w-3xl mx-auto pb-10">
			<h1 className="text-2xl font-bold mb-6">Notifications</h1>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<NotificationsDispaly />
			</HydrationBoundary>
		</div>
	);
}

export default NotificationsPage;
