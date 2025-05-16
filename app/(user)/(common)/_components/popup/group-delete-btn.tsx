"use client";

import CustomPortal from "@/app/_components/custom-portal";
import { useDeleteCartGroup } from "@/hooks/useCart";
import { handleError } from "@/lib/handleError";
import { useRef, useState } from "react";
import { LuTrash2, LuX } from "react-icons/lu";

type PropType = {
	title: string;
	groupId: string;
};

function GroupDeleteBtn({ groupId, title }: PropType) {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDialogElement>(null);

	function showModal() {
		setIsOpen(true);
	}

	const { isPending, mutate, isError, error } = useDeleteCartGroup({
		title,
		onSuccess: () => {
			setIsOpen(false);
		},
	});

	return (
		<>
			<button onClick={showModal} className="btn btn-sm btn-square btn-ghost">
				<LuTrash2 className="size-4" />
			</button>

			{isOpen && (
				<CustomPortal>
					<dialog ref={ref} className="modal modal-open">
						<div className="modal-box">
							<button
								onClick={() => setIsOpen(false)}
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
								<LuX className="size-4" />
							</button>

							<div className="space-y-4">
								<div>
									<h3 className="font-bold text-lg">
										Delete group
									</h3>

									<p className="text-gray-500">
										Are you sure you
										want to delete this
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
											mutate({
												groupId,
											});
										}}
										disabled={isPending}
										className="btn btn-primary btn-block">
										Yes, delete
									</button>
									<button
										onClick={() => {
											setIsOpen(
												false
											);
										}}
										className="btn btn-secondary btn-block">
										Cancel
									</button>
								</div>
							</div>
						</div>
						<form method="dialog" className="modal-backdrop">
							<button onClick={() => setIsOpen(false)}>
								close
							</button>
						</form>
					</dialog>
				</CustomPortal>
			)}
		</>
	);
}

export default GroupDeleteBtn;
