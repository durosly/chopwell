"use client";

import useCheckoutStore from "@/store/checkout-store";
import ShippingDeliveryInfo from "./shipping-delivery-info";

function ShippingMethodInfo() {
	const { deliveryMethod } = useCheckoutStore();

	if (deliveryMethod === "pickup") {
		return (
			<>
				<h3 className="font-bold">Pickup Order</h3>
				<div>
					<p>Ensure to visit our shop before closing hours</p>
				</div>
			</>
		);
	} else if (deliveryMethod === "delivery") {
		return <ShippingDeliveryInfo />;
	} else {
		return null;
	}
}

export default ShippingMethodInfo;
