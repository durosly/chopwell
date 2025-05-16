"use client";

import CustomPortal from "@/app/_components/custom-portal";
import { useMoveCartItem } from "@/hooks/useCart";
import { useState } from "react";
import { LuMoveVertical, LuX } from "react-icons/lu";

function MoveCartItemButton({
	group,
	cartItemId,
}: {
	group: { _id: string; title: string }[];
	cartItemId: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

	function handleMoveCartItem() {
		// 👇 Close the popover programmatically
		const popoverEl = document.getElementById(`action-${cartItemId}`);
		if (popoverEl?.hidePopover) {
			popoverEl.hidePopover(); // Native API
		}

		setIsOpen(true);
	}

	const { mutate: moveCartItemMutate, isPending } = useMoveCartItem();

	function handleMoveCartItemSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!selectedGroup) return;
		moveCartItemMutate({ cartItemId, groupId: selectedGroup });
		setIsOpen(false);
	}

	return (
		<>
			<button
				className="btn btn-sm btn-soft"
				onClick={handleMoveCartItem}
				disabled={isPending}>
				<LuMoveVertical />
				<span>Move to group</span>
			</button>
			{isOpen && (
				<CustomPortal>
					<dialog className="modal modal-open">
						<div className="modal-box">
							<button
								onClick={() => setIsOpen(false)}
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
								<LuX className="size-4" />
							</button>

							<h3 className="font-bold text-lg mb-4">
								Move to group
							</h3>
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

								<button
									disabled={isPending}
									className="btn btn-primary btn-sm">
									Move
								</button>
							</form>
						</div>
					</dialog>
				</CustomPortal>
			)}
		</>
	);
}

export default MoveCartItemButton;
