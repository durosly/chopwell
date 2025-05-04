"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { ToastRef } from "@/types";
import { deleteFood } from "@/api/admin";
import { handleError } from "@/lib/handleError";

function DeleteFoodBtn({ foodId }: { foodId: string }) {
	const router = useRouter();
	const toastRef = useRef<ToastRef>(undefined);
	const [isOpen, setIsOpen] = useState(false);

	const mutation = useMutation({
		mutationFn: async () => deleteFood(foodId),
		onMutate: () => {
			toastRef.current = toast.loading("Deleting food...", {
				id: toastRef.current,
				duration: Infinity,
			});
		},
		onSuccess: () => {
			toast.success("Food deleted successfully", {
				id: toastRef.current,
			});
			router.push("/dashboard/food");
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, {
				id: toastRef.current,
			});
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef.current);
			}, 5000);
		},
	});

	return (
		<>
			<button
				className="btn btn-error btn-block"
				disabled={mutation.isPending}
				onClick={() => setIsOpen(true)}>
				{mutation.isPending ? "Deleting..." : "Delete"}
			</button>
			<dialog
				className={`modal ${isOpen ? "modal-open" : ""} modal-bottom sm:modal-middle`}>
				<div className="modal-box">
					<h3 className="font-bold text-lg">Are you sure?</h3>
					<p className="py-4">This action cannot be undone.</p>
					<div className="modal-action">
						<button
							type="button"
							className="btn btn-ghost"
							disabled={mutation.isPending}
							onClick={() => setIsOpen(false)}>
							Cancel
						</button>
						<button
							type="button"
							disabled={mutation.isPending}
							className="btn btn-error"
							onClick={() => mutation.mutate()}>
							{mutation.isPending
								? "Deleting..."
								: "Delete"}
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
}

export default DeleteFoodBtn;
