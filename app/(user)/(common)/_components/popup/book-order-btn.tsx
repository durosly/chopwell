"use client";

import { useState } from "react";

import useCartStore from "@/store/cart-store";
import CustomPortal from "@/app/_components/custom-portal";
import { useBookOrder } from "@/hooks/useCart";

function BookOrderBtn() {
	const { mutate, isPending: isBooking } = useBookOrder({
		onSuccess(newOrderCode) {
			if (newOrderCode) {
				setOrderCode(newOrderCode);
			}
		},
	});
	const [isOpen, setIsOpen] = useState(false);
	const { setOrderCode } = useCartStore();

	return (
		<>
			<button onClick={() => setIsOpen(true)} className="btn btn-lg join-item">
				Book Order
			</button>

			{isOpen && (
				<CustomPortal>
					<dialog className="modal modal-open modal-bottom sm:modal-middle">
						<div className="modal-box">
							<div className="text-center">
								<p className="text-xs">
									Confirm to book order
								</p>
								<p>
									You are about to book an
									order
								</p>
								<p className="text-gray-500 text-sm italic">
									This will only generate code
									that you can share with your
									friends
								</p>
							</div>

							<div className="modal-action">
								{!isBooking && (
									<button
										onClick={() =>
											setIsOpen(
												false
											)
										}
										className="btn">
										Cancel
									</button>
								)}

								<button
									onClick={() => mutate()}
									disabled={isBooking}
									className="btn btn-primary flex-1 sm:flex-none">
									{isBooking ? (
										<>
											<span className="loading loading-spinner"></span>{" "}
											Booking...
										</>
									) : (
										"Confirm"
									)}
								</button>
							</div>
						</div>
					</dialog>
				</CustomPortal>
			)}
		</>
	);
}

export default BookOrderBtn;
