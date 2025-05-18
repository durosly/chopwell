"use client";

import CustomPortal from "@/app/_components/custom-portal";
import { useGetUserCart, usePayOrder } from "@/hooks/useCart";
import useCartStore from "@/store/cart-store";
import commaNumber from "@/utils/comma-number";
import { useSession } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { toast } from "sonner";

function PayOrderBtn() {
	const [isOpen, setIsOpen] = useState(false);
	const { setOrderCode } = useCartStore();
	const { data, isPending, isError } = useGetUserCart();
	const { data: session } = useSession();
	const router = useRouter();

	const { mutate, isPending: isPaying } = usePayOrder({
		onSuccess: (newOrderCode) => {
			if (newOrderCode) {
				setOrderCode(newOrderCode);
			}
		},
		action: {
			label: "Fund Account",
			onClick: () => router.push("/user/wallet/top-up"),
		},
	});

	const handlePayOrder = () => {
		if (!session) {
			toast.error("Please login to pay for your order", {
				action: { label: "Login", onClick: () => router.push("/login") },
			});
			return;
		}

		setIsOpen(true);
	};

	return (
		<>
			<button
				onClick={handlePayOrder}
				disabled={isPaying}
				className="btn btn-lg btn-primary flex-1 flex-col gap-0 join-item">
				<span>Place Order</span>
				{!isPending && !isError && (
					<span className="text-[10px]">
						About to pay {commaNumber(data?.total)}
					</span>
				)}
			</button>

			{isOpen && (
				<CustomPortal>
					<dialog className="modal modal-open modal-bottom sm:modal-middle">
						<div className="modal-box">
							<div className="text-center">
								<p>Confirm to pay</p>
								<p className="text-2xl font-bold">
									{commaNumber(data?.total)}
								</p>
							</div>

							<div className="modal-action">
								{!isPaying && (
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
									disabled={isPaying}
									className="btn btn-primary flex-1 sm:flex-none">
									{isPaying ? (
										<>
											<span className="loading loading-spinner"></span>{" "}
											Paying...
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

export default PayOrderBtn;
