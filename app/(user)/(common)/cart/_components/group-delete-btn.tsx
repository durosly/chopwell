"use client";

import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartGroup } from "@/api";
import { handleError } from "@/lib/handleError";
import { toast } from "sonner";
import IconTrash from "@/icons/trash";

type PropType = {
	title: string;
	groupId: string;
};

function GroupDeleteBtn({ groupId, title }: PropType) {
	const ref = useRef<HTMLDialogElement>(null);

	function showModal() {
		if (ref.current) {
			ref.current.showModal();
		}
	}

	const queryClient = useQueryClient();

	const { isPending, mutate, isError, error } = useMutation({
		mutationFn: () => {
			return deleteCartGroup({ id: groupId });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart-full-data"] });
			if (ref.current) {
				ref.current.close();
			}

			toast.success("Success", {
				description: `Cart group(${title}) deleted successfully`,
			});
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Something went wrong", { description: message });
		},
	});

	return (
		<>
			<button onClick={showModal} className="btn btn-sm btn-ghost">
				<IconTrash className="w-4 h-4" />
			</button>

			<dialog ref={ref} className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<div className="space-y-4">
						<div>
							<h3 className="font-bold text-lg">
								Delete group
							</h3>

							<p className="text-gray-500">
								Are you sure you want to delete this
								group(
								<span className="italic">
									{title}
								</span>
								)?
							</p>
						</div>

						{isError && (
							<div className="bg-red-200 p-2 my-2 rounded">
								{handleError(error)}
							</div>
						)}

						<div className="flex flex-wrap gap-5">
							<button
								onClick={() => {
									mutate();
								}}
								disabled={isPending}
								className="btn btn-primary btn-block">
								Yes, delete
							</button>
							<button
								onClick={() => {
									if (ref.current) {
										ref.current.close();
									}
								}}
								className="btn btn-secondary btn-block">
								Cancel
							</button>
						</div>
					</div>

					<p className="py-4 text-xs text-gray-500">
						* Press ESC key or click the button below to close
					</p>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default GroupDeleteBtn;
