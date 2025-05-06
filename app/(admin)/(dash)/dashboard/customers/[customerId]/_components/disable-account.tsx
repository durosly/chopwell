"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRef } from "react";
import { ToastRef } from "@/types";
import { handleError } from "@/lib/handleError";
import { updateUserStatus } from "@/api/admin";
import { useRouter } from "next/navigation";

interface DisableAccountProps {
	userId: string;
	isDisabled: boolean;
}

export default function DisableAccount({ userId, isDisabled }: DisableAccountProps) {
	const router = useRouter();
	const toastRef = useRef<ToastRef>(undefined);

	const { mutate, isPending } = useMutation({
		mutationFn: (data: { userId: string; disabled: boolean }) => updateUserStatus(data),
		onMutate: () => {
			toastRef.current = toast.loading(
				isDisabled
					? "Enabling user account..."
					: "Disabling user account...",
				{ duration: Infinity }
			);
		},
		onSuccess: () => {
			toast.success(
				isDisabled
					? "User account enabled successfully"
					: "User account disabled successfully",
				{ id: toastRef.current }
			);
			router.refresh();
		},
		onError: (error: Error) => {
			const message = handleError(error);
			toast.error(message || "Failed to update user status", {
				id: toastRef.current,
			});
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef.current);
			}, 5000);
		},
	});

	const handleStatusChange = () => {
		const modal = document.getElementById("confirm-modal") as HTMLDialogElement;
		if (modal) {
			modal.showModal();
		}
	};

	const confirmStatusChange = () => {
		mutate({ userId, disabled: !isDisabled });
		const modal = document.getElementById("confirm-modal") as HTMLDialogElement;
		if (modal) {
			modal.close();
		}
	};

	return (
		<>
			<button
				className={`btn btn-sm ${isDisabled ? "btn-success" : "btn-error"}`}
				onClick={handleStatusChange}
				disabled={isPending}>
				{isDisabled ? "Enable Account" : "Disable Account"}
			</button>

			<dialog id="confirm-modal" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						{isDisabled
							? "Enable User Account"
							: "Disable User Account"}
					</h3>
					<p className="py-4">
						Are you sure you want to{" "}
						{isDisabled ? "enable" : "disable"} this user
						account?
						{!isDisabled &&
							" The user will not be able to access their account."}
					</p>
					<div className="modal-action">
						<form method="dialog" className="flex gap-2">
							<button className="btn">Cancel</button>
							<button
								className={`btn ${isDisabled ? "btn-success" : "btn-error"}`}
								onClick={confirmStatusChange}
								disabled={isPending}>
								{isDisabled ? "Enable" : "Disable"}
							</button>
						</form>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}
