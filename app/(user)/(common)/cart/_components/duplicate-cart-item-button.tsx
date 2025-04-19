"use client";
import { copyCartItem } from "@/api";
import { handleError } from "@/lib/handleError";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { toast } from "sonner";

function DuplicateCartItemButton({
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

	function handleCopyCartItem() {
		choiceRef.current?.showModal();
	}

	const { mutate: copyCartItemMutate, isPending } = useMutation({
		onMutate: () => {
			toastRef.current = toast.loading("Copying item...", { duration: 5000 });
		},
		mutationFn: ({ cartItemId, groupId }: { cartItemId: string; groupId: string }) =>
			copyCartItem({ cartItemId, groupId }),
		onSuccess: () => {
			toast.success("Item copied successfully", { id: toastRef.current });
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

	function handleCopyCartItemSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!selectedGroup) return;
		copyCartItemMutate({ cartItemId, groupId: selectedGroup });
		choiceRef.current?.close();
	}

	return (
		<>
			<button
				onClick={handleCopyCartItem}
				className="btn btn-ghost btn-square btn-sm">
				<LuCopy />
			</button>

			<dialog ref={choiceRef} className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg mb-4">Copy to group</h3>
					<form
						onSubmit={handleCopyCartItemSubmit}
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
							Copy
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

export default DuplicateCartItemButton;
