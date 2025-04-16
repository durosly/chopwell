"use client";
import useCheckoutStore from "@/store/checkout-store";
import commaNumber from "@/utils/comma-number";
import { LuLock } from "react-icons/lu";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import type { FormattedAddress, OrderData } from "@/types";
import { handleError } from "@/lib/handleError";
import { createCheckoutSession } from "@/api";
import LoadingCartAnimation from "../../../cart/_components/loading-cart";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";

function CheckoutPayment() {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [loadingMsg, setLoadingMsg] = useState("processing");
	const { isPending, mutate } = useMutation({
		mutationFn: async (data: OrderData) => createCheckoutSession(data),
		onMutate: () => {
			setShowModal(true);
		},
		onError: (error) => {
			setShowModal(false);
			const message = handleError(error);
			toast.error("Failed to process checkout", { description: message });
		},
		onSuccess: (response) => {
			toast.success("Checkout successful", { description: response.message });
			setLoadingMsg("Loading order information");
			router.push(`/user/orders/${response.orderId}`);
		},
	});
	const state = useCheckoutStore();
	const { subtotal, deliveryFee, discount, total, address, deliveryMethod } = state;

	const validateCheckout = () => {
		const checkoutSchema = z
			.object({
				deliveryMethod: z.string(),
				address: z.string().optional(),
			})
			.refine((data) => !(data.deliveryMethod === "delivery" && !data.address), {
				message: "Please provide a delivery address",
			});

		const result = checkoutSchema.safeParse({
			deliveryMethod,
			address,
		});

		if (!result.success) {
			return {
				errors: result.error.errors.map((err) => err.message),
				data: null,
			};
		}

		return {
			errors: [],
			data: result.data,
		};
	};

	const handleCheckout = async () => {
		const { errors, data } = validateCheckout();

		if (errors.length > 0) {
			errors.map((error) => {
				console.log(error);
				toast.error("Data Error", { description: error });
			});
			return;
		}

		if (!data) {
			toast.error("Something went wrong");
			return;
		}

		if (isPending) return;

		try {
			const orderData: OrderData = {
				// paymentDetails: {
				// 	method: data.paymentMethod as
				// 		| "card"
				// 		| "wallet"
				// 		| "virtual-account"
				// 		| "pay-for-me",
				// 	card: data.card,
				// },
				shipping: {
					method: data.deliveryMethod as "delivery" | "pickup",
					address: data.address as unknown as FormattedAddress,
				},
			};

			mutate(orderData);
		} catch (error) {
			console.error("Checkout failed:", error);
			const message = handleError(error);
			toast.error("Failed to process checkout", { description: message });
		}
	};

	return (
		<>
			<div className="mb-5">
				<ul className="mb-2">
					<li className="flex justify-between gap-5">
						<span className="text-gray-500">Subtotal</span>
						<span className="font-semibold">
							{commaNumber(subtotal)}
						</span>
					</li>
					<li className="flex justify-between gap-5">
						<span className="text-gray-500">Delivery</span>
						<span className="font-semibold">
							{commaNumber(deliveryFee)}
						</span>
					</li>
					<li className="flex justify-between gap-5 mb-1">
						<span className="text-gray-500">Discount</span>
						<span className="font-semibold">
							{commaNumber(discount)}
						</span>
					</li>
					<li className="flex justify-between gap-5">
						<span className="font-bold">Total</span>
						<span className="font-bold">
							{commaNumber(total)}
						</span>
					</li>
				</ul>

				<button
					onClick={handleCheckout}
					disabled={isPending}
					className="btn btn-primary btn-block">
					{isPending ? (
						<>
							<span className="loading loading-spinner"></span>
							Processing...
						</>
					) : (
						`Checkout (${commaNumber(total)})`
					)}
				</button>
			</div>

			<div>
				<div className="flex items-center gap-2">
					<LuLock className="text-primary" />
					<p className="font-bold">Secure Checkout - SSL Encrypted</p>
				</div>
				<p className="text-gray-500">
					Ensuring your personal and financial information is secured
					during every transaction
				</p>
			</div>

			{/* add daisyUI dialog element to cover screen when checkout is processing */}
			<dialog className={cn("modal", { "modal-open": showModal })}>
				<div className="modal-box">
					<div className="flex flex-col justify-center items-center">
						<LoadingCartAnimation />
						<span className="animate-pulse">
							{loadingMsg}...
						</span>
						<span className="loading loading-spinner"></span>
					</div>
				</div>
			</dialog>
		</>
	);
}

export default CheckoutPayment;
