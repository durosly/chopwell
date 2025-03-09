"use client";
import useCartItemQuatityUpdate from "@/hooks/useCartItemQuatityUpdate";
import { LuMinus } from "react-icons/lu";

function ReduceItemQuantity({ quantity, itemId }: { quantity: number; itemId: string }) {
	const { isPending, mutate } = useCartItemQuatityUpdate({ cartItemId: itemId });

	return (
		<button
			onClick={() => mutate({ quantity: quantity - 1 })}
			disabled={quantity === 1 || isPending}
			className="btn btn-square btn-sm">
			<LuMinus />
		</button>
	);
}

export default ReduceItemQuantity;
