"use client";

import { useToggleCartItem } from "@/hooks/useCart";
import useCartStore from "@/store/cart-store";
import { cn } from "@/utils/cn";
import { PropsWithChildren } from "react";

type CartBtnProps = PropsWithChildren<{
	className?: string | undefined;
	foodId: string;
	activeClassName?: string | undefined;
}>;

function CartBtn({ className, children, foodId, activeClassName }: CartBtnProps) {
	const { isInCart, addToCart, removeFromCart } = useCartStore();

	const inCart = isInCart(foodId);

	const { isPending, mutate } = useToggleCartItem({
		inCart,
		onSuccess: () => {
			(() => (inCart ? removeFromCart(foodId) : addToCart(foodId)))();
		},
	});

	return (
		<button
			disabled={isPending || inCart}
			onClick={() => mutate({ foodId })}
			className={cn("cart-btn", className, inCart && activeClassName)}>
			{isPending ? (
				<span className="loading loading-sm loading-dots"></span>
			) : inCart ? (
				<span>In Cart</span>
			) : (
				children
			)}
		</button>
	);
}

export default CartBtn;
