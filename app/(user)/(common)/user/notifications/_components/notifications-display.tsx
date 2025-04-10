"use client";
import { getUserNotifications } from "@/api";
import { handleError } from "@/lib/handleError";
import { Notification } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LuBadgeAlert } from "react-icons/lu";
import NotificationItem from "./notification-item";

function NotificationsDispaly() {
	const { isLoading, data, isError, error, isFetching, isSuccess } = useQuery<{
		notifications: Notification[];
	}>({
		queryFn: () => getUserNotifications(),
		queryKey: ["notifications"],
	});

	return (
		<div className="space-y-4">
			{isLoading &&
				Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="h-5 skeleton"></div>
				))}

			{isError && (
				<div className="alert alert-error alert-soft">
					<LuBadgeAlert className="w-5 h-5 flex-shrink-0" />
					<p>{handleError(error)}</p>
				</div>
			)}

			{isSuccess && (
				<>
					{data.notifications.length === 0 ? (
						<div className="text-center py-8 text-base-content/60">
							No notifications yet
						</div>
					) : (
						<>
							{data.notifications.map((notification) => (
								<NotificationItem
									key={notification._id}
									notification={notification}
								/>
							))}
						</>
					)}
				</>
			)}

			{isFetching && (
				<div>
					<span className="loading loading-spinner"></span>
					<span>Updating...</span>
				</div>
			)}
		</div>
	);
}

export default NotificationsDispaly;
