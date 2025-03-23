"use client";
import useCheckoutStore from "@/store/checkout-store";
import commaNumber from "@/utils/comma-number";
import { LuLock } from "react-icons/lu";

function CheckoutPayment() {
	const { subtotal, deliveryFee, discount, total } = useCheckoutStore();
	return (
		<>
			<div className="mb-5">
				<ul className="mb-2">
					<li className="flex justify-between gap-5">
						<span className="text-gray-500">Subtotal</span>
						<span className="font-semibold">{commaNumber(subtotal)}</span>
					</li>
					<li className="flex justify-between gap-5">
						<span className="text-gray-500">Delivery</span>
						<span className="font-semibold">{commaNumber(deliveryFee)}</span>
					</li>
					<li className="flex justify-between gap-5 mb-1">
						<span className="text-gray-500">Discount</span>
						<span className="font-semibold">{commaNumber(discount)}</span>
					</li>
					<li className="flex justify-between gap-5">
						<span className="font-bold">Total</span>
						<span className="font-bold">{commaNumber(total)}</span>
					</li>
				</ul>

				<button className="btn btn-primary btn-block">Checkout ({commaNumber(total)})</button>
			</div>

			<div>
				<div className="flex items-center gap-2">
					<LuLock className="text-primary" />
					<p className="font-bold">Secure Checkout - SSL Encrypted</p>
				</div>
				<p className="text-gray-500">Ensuring your personal and financial information is secured during every transaction</p>
			</div>
		</>
	);
}

export default CheckoutPayment;
