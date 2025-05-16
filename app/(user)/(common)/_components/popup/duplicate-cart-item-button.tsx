"use client";
import CustomPortal from "@/app/_components/custom-portal";
import { useCopyCartItem } from "@/hooks/useCart";
import { useState } from "react";
import { LuCopy, LuX } from "react-icons/lu";

function DuplicateCartItemButton({
	group,
	cartItemId,
}: {
	group: { _id: string; title: string }[];
	cartItemId: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

	function handleCopyCartItem() {
		const popoverEl = document.getElementById(`action-${cartItemId}`);
		if (popoverEl?.hidePopover) {
			popoverEl.hidePopover(); // Native API
		}

		setIsOpen(true);
	}

	const { mutate: copyCartItemMutate, isPending } = useCopyCartItem();

	function handleCopyCartItemSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!selectedGroup) return;
		copyCartItemMutate({ cartItemId, groupId: selectedGroup });
		setIsOpen(false);
	}

	return (
		<>
			<button onClick={handleCopyCartItem} className="btn btn-sm btn-soft">
				<LuCopy />
				<span>Copy to group</span>
			</button>

			{isOpen && (
				<CustomPortal>
					<dialog className="modal modal-open">
						<div className="modal-box">
							<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
								<LuX className="size-4" />
							</button>

							<h3 className="font-bold text-lg mb-4">
								Copy to group
							</h3>
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

								<button
									disabled={isPending}
									className="btn btn-primary btn-sm">
									Copy
								</button>
							</form>
						</div>
					</dialog>
				</CustomPortal>
			)}
		</>
	);
}

export default DuplicateCartItemButton;
