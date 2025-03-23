"use client";

import useCheckoutStore, { Cart } from "@/store/checkout-store";
import CartInfo from "./cart-info";

function CartDataDesktop() {
	const { cart } = useCheckoutStore();
	return (
		<div className="space-y-4">
			{cart.map((cartGroup: Cart, i) => (
				<div key={i} className="card border rounded-box">
					<div className="card-body">
						<CartInfo cart={cartGroup} />
					</div>
				</div>
			))}
		</div>
	);
}

export default CartDataDesktop;
