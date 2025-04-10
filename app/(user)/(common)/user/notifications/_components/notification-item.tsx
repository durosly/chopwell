"use client";

import { Notification } from "@/types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import DeleteNotificationModal from "./delete-notification-modal";
import MarkReadNotificationButton from "./mark-read-notification-button";

function NotificationItem({ notification }: { notification: Notification }) {
	return (
		<div
			key={notification._id}
			className={`card bg-base-100  ${
				notification.isRead ? "" : "border border-base-200"
			}`}>
			<div className="card-body p-4">
				<div className="flex justify-between items-start">
					<div className="space-y-1">
						<h3 className="font-semibold text-lg">
							{notification.title}
						</h3>
						<p className="text-base-content/70">
							{notification.description}
						</p>
						<div className="text-sm text-base-content/50">
							{formatDistanceToNow(
								notification.createdAt,
								{
									addSuffix: true,
								}
							)}
						</div>
					</div>
					<div className="flex gap-2">
						{!notification.isRead && (
							<MarkReadNotificationButton
								notificationId={notification._id}
							/>
						)}
						<DeleteNotificationModal
							notificationId={notification._id}
						/>
					</div>
				</div>
				{notification.link && (
					<Link
						href={notification.link}
						className="btn btn-sm btn-primary mt-2 w-fit">
						{notification.linkDescription}
					</Link>
				)}
			</div>
		</div>
	);
}

export default NotificationItem;
