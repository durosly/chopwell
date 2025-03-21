"use client";

import useCheckoutStore from "@/store/checkout-store";
import PaymentMethodInfo from "./payment-method-info";

function PaymentMethodInfoDesktop() {
	const { paymentMethod } = useCheckoutStore();

	if (paymentMethod === "") {
		return null;
	}

	return (
		<div className="card border">
			<div className="card-body">
				<PaymentMethodInfo />
			</div>
		</div>
	);
}

export default PaymentMethodInfoDesktop;
