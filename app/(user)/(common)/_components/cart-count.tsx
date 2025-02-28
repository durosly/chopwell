"use client";

import useCartStore from "@/store/cart-store";

function CartCount() {
	const { cart } = useCartStore();
	return (
		<span className="absolute -top-1 -right-1 text-xs text-primary-content font-bold bg-primary rounded-full w-4 h-4 flex items-center justify-center ">
			{cart.length}
		</span>
	);
}

export default CartCount;
