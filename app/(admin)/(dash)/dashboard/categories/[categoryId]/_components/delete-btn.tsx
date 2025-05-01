"use client";
import { LuTrash } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRef } from "react";
import { deleteSubCategory } from "@/api/admin";
import { handleError } from "@/lib/handleError";

type PropType = {
	subCategoryId: string;
};

function DeleteBtn({ subCategoryId }: PropType) {
	const modalRef = useRef<HTMLDialogElement>(null);
	const queryClient = useQueryClient();
	const toastRef = useRef<string | number | undefined>(undefined);

	const { mutate, isPending } = useMutation({
		mutationFn: () => deleteSubCategory(subCategoryId),
		onMutate: () => {
			toastRef.current = toast.loading("Deleting sub-category...", {
				duration: Infinity,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["subcategories"] });
			toast.success("Sub-category deleted successfully", {
				id: toastRef.current,
			});
			// Close the modal
			if (modalRef.current) modalRef.current.close();
		},
		onError: (error: Error) => {
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
				className="btn btn-sm btn-error join-item"
				disabled={isPending}
				onClick={() => {
					if (modalRef.current) modalRef.current.showModal();
				}}>
				<LuTrash /> Delete
			</button>

			<dialog ref={modalRef} className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Delete Sub-Category</h3>
					<p className="py-4">
						Are you sure you want to delete this sub-category?
						This action cannot be undone.
					</p>
					<div className="modal-action">
						<form method="dialog" className="flex gap-2">
							<button className="btn">Cancel</button>
							<button
								className="btn btn-error"
								onClick={() => mutate()}
								disabled={isPending}>
								{isPending
									? "Deleting..."
									: "Delete"}
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

export default DeleteBtn;
