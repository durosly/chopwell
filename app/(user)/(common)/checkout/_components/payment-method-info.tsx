"use client";

import useCheckoutStore from "@/store/checkout-store";
import Link from "next/link";
import { LuEye } from "react-icons/lu";
import CardPaymentInfo from "./card/payment-info";

function PaymentMethodInfo() {
	const { paymentMethod } = useCheckoutStore();

	if (paymentMethod === "pay-for-me") {
		return (
			<>
				{/* generate pay-for-me link option display */}
				<div>
					<h3 className="font-bold">Generate Pay-for-me Link</h3>
					<p className="text-gray-500">* A unique link would be generated for you to share with the person you want to pay for you</p>
				</div>
			</>
		);
	} else if (paymentMethod === "card") {
		return <CardPaymentInfo />;
	} else if (paymentMethod === "wallet") {
		return (
			<>
				{/* Chopwell balance option display */}
				<div>
					<h3 className="font-bold">Balance</h3>
					<div>
						<p className="mb-2">
							Your current balance is <span className="text-primary">****</span>{" "}
							<button>
								<LuEye />
							</button>
						</p>
						<p className="text-xs">
							Top up your balance{" "}
							<Link className="link" href="/wallet/top-up">
								here
							</Link>
						</p>
					</div>
				</div>
			</>
		);
	} else if (paymentMethod === "virtual-account") {
		return (
			<>
				{/* virtual account option display */}
				<div>
					<h3 className="font-bold">Checkout Virtual Account</h3>
					<p className="text-gray-500">* Virtual account would be generated in the next screen</p>
				</div>
			</>
		);
	}

	return null;
}

export default PaymentMethodInfo;
