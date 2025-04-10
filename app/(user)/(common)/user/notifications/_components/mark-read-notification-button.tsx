"use client";

import { markUserNotificationAsRead } from "@/api";
import { handleError } from "@/lib/handleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";

function MarkReadNotificationButton({ notificationId }: { notificationId: string }) {
	const toastRef = useRef<string | number | undefined>(undefined);
	const queryClient = useQueryClient();

	const { mutate: markAsRead, isPending } = useMutation({
		onMutate: () => {
			toastRef.current = toast.loading("Deleting notification...", {
				duration: Infinity,
			});
		},
		mutationFn: async () => markUserNotificationAsRead(notificationId),
		onSuccess: () => {
			toast.success("Notification deleted successfully", {
				id: toastRef.current,
			});
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, { id: toastRef.current });
		},

		onSettled: () => {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
		},
	});

	return (
		<button
			disabled={isPending}
			onClick={() => markAsRead()}
			className="btn btn-sm btn-ghost">
			Mark as read
		</button>
	);
}

export default MarkReadNotificationButton;
