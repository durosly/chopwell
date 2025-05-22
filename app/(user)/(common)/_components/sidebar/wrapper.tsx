"use client";

import OrderCodeEntry from "./order-code-entry";
import CheckoutOrder from "./checkout-order";

import useCartStore from "@/store/cart-store";

function LandingSidebarWrapper() {
	const { cart } = useCartStore();

	if (cart.length === 0) {
		return <OrderCodeEntry />;
	}

	return <CheckoutOrder />;
}

export default LandingSidebarWrapper;
