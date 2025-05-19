"use client";

import { handleError } from "@/lib/handleError";
import pusherClient from "@/lib/pusher-client";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function NotificationCountHandler({
	initialCount,
	userId,
}: {
	initialCount: number;
	userId: string;
}) {
	const router = useRouter();
	const [count, setCount] = useState(initialCount);

	useEffect(() => {
		function handleNotificationCount() {
			try {
				const channel = pusherClient.subscribe(
					`private-notifications-${userId}`
				);
				channel.bind("notification-count", (data: { count: number }) => {
					toast(`You have a new notifications`, {
						action: {
							label: "View",
							onClick: () => {
								router.push("/user/notifications");
							},
						},
					});
					setCount((prev) => prev + data.count);
				});
			} catch (error) {
				const message = handleError(error);
				console.error(message);
			}
		}

		handleNotificationCount();

		return () => {
			pusherClient.unsubscribe(`private-notifications-${userId}`);
		};
	}, [userId, router]);

	return <span className="badge badge-primary">{count}</span>;
}

export default NotificationCountHandler;
