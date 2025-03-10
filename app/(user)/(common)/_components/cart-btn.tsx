"use client";

import { addItemToCart, removeCartItem } from "@/api";
import { handleError } from "@/lib/handleError";
import useCartStore from "@/store/cart-store";
import { cn } from "@/utils/cn";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

type CartBtnProps = PropsWithChildren<{
	className?: string | undefined;
	foodId: string;
	activeClassName?: string | undefined;
}>;

function CartBtn({ className, children, foodId, activeClassName }: CartBtnProps) {
	const queryClient = useQueryClient();
	const { isInCart, addToCart, removeFromCart } = useCartStore();

	const inCart = isInCart(foodId);

	const { isPending, mutate } = useMutation({
		mutationFn: ({ foodId }: { foodId: string }) =>
			inCart ? removeCartItem({ foodId }) : addItemToCart({ foodId }),
		onError: (error) => {
			const message = handleError(error);
			toast.error("Cart failed", { description: message });
		},
		onSuccess: () => {
			(() => (inCart ? removeFromCart(foodId) : addToCart(foodId)))();
			queryClient.invalidateQueries({ queryKey: ["cart"] });
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
