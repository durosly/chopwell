"use client";

import { deleteUserNotification } from "@/api";
import IconTrash from "@/icons/trash";
import { handleError } from "@/lib/handleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";

function DeleteNotificationModal({ notificationId }: { notificationId: string }) {
	const modalRef = useRef<HTMLDialogElement>(null);
	const toastRef = useRef<string | number | undefined>(undefined);
	const queryClient = useQueryClient();

	const {
		mutate: deleteNotification,
		isPending,
		isError,
		error,
	} = useMutation({
		onMutate: () => {
			toastRef.current = toast.loading("Deleting notification...", {
				duration: Infinity,
			});
		},
		mutationFn: async () => deleteUserNotification(notificationId),
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
		<>
			<button
				onClick={() => {
					modalRef.current?.show();
				}}
				className="btn btn-sm btn-ghost">
				<IconTrash className="w-4 h-4" />
			</button>

			<dialog ref={modalRef} className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Delete Notification</h3>
					<p className="py-4">
						Are you sure you want to delete this notification?
						This action cannot be undone.
					</p>
					{isError && (
						<div className="alert alert-error alert-soft">
							<p>{handleError(error)}</p>
						</div>
					)}
					<div className="modal-action">
						<form method="dialog" className="flex gap-2">
							<button
								className="btn"
								disabled={isPending}>
								No, Cancel
							</button>
						</form>
						<button
							className="btn btn-error"
							onClick={() => deleteNotification()}
							disabled={isPending}>
							{isPending ? "Deleting..." : "Yes, Delete"}
						</button>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default DeleteNotificationModal;
