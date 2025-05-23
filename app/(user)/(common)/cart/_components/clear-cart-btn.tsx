"use client";
import { useClearCart } from "@/hooks/useCart";
import IconTrash from "@/icons/trash";
import { handleError } from "@/lib/handleError";
import { useRef } from "react";

function ClearCartBtn() {
	const ref = useRef<HTMLDialogElement>(null);

	function showModal() {
		if (ref.current) {
			ref.current.showModal();
		}
	}

	const { isPending, mutate, isError, error } = useClearCart({
		onSuccess: () => {
			if (ref.current) {
				ref.current.close();
			}
		},
	});

	return (
		<>
			<button
				disabled={isPending}
				onClick={showModal}
				className="btn btn-xs btn-square btn-ghost">
				<IconTrash />
			</button>
			<dialog ref={ref} className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<div className="space-y-4 mb-2">
						<div>
							<h3 className="font-bold text-lg">
								Clear Cart
							</h3>

							<p className="text-gray-500">
								Are you sure you want to clear your
								cart ?
							</p>
						</div>

						{isError && (
							<div className="bg-red-200 p-2 my-2 rounded">
								{handleError(error)}
							</div>
						)}

						<div className="flex flex-wrap gap-3">
							<button
								onClick={() => {
									mutate();
								}}
								disabled={isPending}
								className="btn btn-primary btn-block">
								Yes, clear
							</button>
							<button
								disabled={isPending}
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

					<p className="text-xs text-gray-500">
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

export default ClearCartBtn;
