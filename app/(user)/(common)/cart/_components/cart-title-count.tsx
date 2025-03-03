"use client";

import useCartStore from "@/store/cart-store";

function CartTitleCount() {
	const { cart } = useCartStore();
	return <h2 className="text-xl font-bold">Cart ({cart.length})</h2>;
}

export default CartTitleCount;
