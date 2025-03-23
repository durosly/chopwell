"use client";

import useCheckoutStore from "@/store/checkout-store";
import ShippingMethodInfo from "./shipping-method-info";

function ShippingMethodInfoDesktop() {
	const { deliveryMethod } = useCheckoutStore();

	if (deliveryMethod === "") {
		return null;
	}

	return (
		<div className="card border">
			<div className="card-body">
				<ShippingMethodInfo />
			</div>
		</div>
	);
}

export default ShippingMethodInfoDesktop;
