"use client";

import { LuMoveVertical } from "react-icons/lu";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveCartItem } from "@/api";
import { toast } from "sonner";
import { handleError } from "@/lib/handleError";

function MoveCartItemButton({
	group,
	cartItemId,
}: {
	group: { _id: string; title: string }[];
	cartItemId: string;
}) {
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const choiceRef = useRef<HTMLDialogElement>(null);
	const toastRef = useRef<string | number | undefined>(undefined);
	const queryClient = useQueryClient();

	function handleMoveCartItem() {
		choiceRef.current?.showModal();
	}

	const { mutate: moveCartItemMutate, isPending } = useMutation({
		onMutate: () => {
			toastRef.current = toast.loading("Moving item...", { duration: 5000 });
		},
		mutationFn: ({ cartItemId, groupId }: { cartItemId: string; groupId: string }) =>
			moveCartItem({ cartItemId, groupId }),
		onSuccess: () => {
			toast.success("Item moved successfully", { id: toastRef.current });
			queryClient.invalidateQueries({ queryKey: ["cart-full-data"] });
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, { id: toastRef.current });
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef.current);
			}, 1000);
		},
	});

	function handleMoveCartItemSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!selectedGroup) return;
		moveCartItemMutate({ cartItemId, groupId: selectedGroup });
		choiceRef.current?.close();
	}

	return (
		<>
			<button
				className="btn btn-ghost btn-square btn-sm"
				onClick={handleMoveCartItem}>
				<LuMoveVertical />
			</button>

			<dialog ref={choiceRef} className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg mb-4">Move to group</h3>
					<form
						onSubmit={handleMoveCartItemSubmit}
						className="space-y-2">
						{group.map((g) => (
							<label
								key={g._id}
								htmlFor={g._id}
								className="flex items-center gap-2">
								<input
									type="radio"
									name="radio-1"
									className="radio"
									id={g._id}
									onChange={() =>
										setSelectedGroup(
											g._id
										)
									}
									checked={
										selectedGroup ===
										g._id
									}
								/>
								<div className="text-xs">
									{g.title}
								</div>
							</label>
						))}

						<button className="btn btn-primary btn-sm">
							Move
						</button>
					</form>
					<p className="py-4 text-xs">
						Press ESC key or click the button below to close
					</p>
				</div>
			</dialog>

			{isPending && (
				<div className="fixed inset-0 flex items-center justify-center bg-white/50 w-screen h-screen">
					<div className="w-10 h-10 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
				</div>
			)}
		</>
	);
}

export default MoveCartItemButton;
