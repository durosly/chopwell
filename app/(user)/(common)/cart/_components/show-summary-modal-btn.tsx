"use client";

import IconArrowLeft from "@/icons/arrow-left";
import SubtotalDisplay from "./subtotal-display";
import CartSummary from "./cart-summary";
import PromoCodeForm from "./promo-code-form";
import CartReturnPolicy from "./cart-return-policy";
import { useRef } from "react";

function ShowSummaryModal() {
	const ref = useRef<HTMLDialogElement | null>(null);
	function handleClick() {
		if (ref.current) {
			ref.current.showModal();
		}
	}
	return (
		<>
			<button
				className="flex items-center gap-2 cursor-pointer"
				onClick={handleClick}>
				<span>
					<SubtotalDisplay />
				</span>
				<IconArrowLeft className="w-5 h-5 rotate-90" />
			</button>
			<dialog ref={ref} className="modal modal-bottom text-black">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-square border-none bg-secondary/80 text-[#292D32] rounded-[8px] p-1 absolute right-2 top-2">
							✕
						</button>
					</form>
					<div>
						<CartSummary />
						<hr className="mt-5" />
						<PromoCodeForm parentClassName="px-0" />
						<CartReturnPolicy />
					</div>
				</div>
			</dialog>
		</>
	);
}

export default ShowSummaryModal;
