"use client";

import { deleteUserAddress } from "@/api";
import { handleError } from "@/lib/handleError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useRef } from "react";
import { toast } from "sonner";

function DeleteModal({ addressId }: { addressId: string }) {
	const router = useRouter();
	const modalRef = useRef<HTMLDialogElement>(null);
	const toastRef = useRef<string | number | undefined>(undefined);

	const {
		mutate: deleteAddress,
		isPending,
		isError,
		error,
	} = useMutation({
		onMutate: () => {
			toastRef.current = toast.loading("Deleting address...", {
				duration: Infinity,
			});
		},
		mutationFn: async () => deleteUserAddress(addressId),
		onSuccess: () => {
			toast.success("Address deleted successfully", { id: toastRef.current });
			router.back();
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
				className="btn btn-block btn-error"
				onClick={() => {
					modalRef.current?.show();
				}}>
				Delete Address
			</button>

			<dialog ref={modalRef} className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Delete Address</h3>
					<p className="py-4">
						Are you sure you want to delete this address? This
						action cannot be undone.
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
							onClick={() => deleteAddress()}
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

export default DeleteModal;
