"use client";
import useCartItemQuatityUpdate from "@/hooks/useCartItemQuatityUpdate";
import { LuPlus } from "react-icons/lu";

function IncreaseItemQuantity({ quantity, itemId }: { quantity: number; itemId: string }) {
	const { isPending, mutate } = useCartItemQuatityUpdate({ cartItemId: itemId });

	return (
		<button
			onClick={() => mutate({ quantity: quantity + 1 })}
			disabled={isPending}
			className="btn btn-square btn-sm">
			<LuPlus />
		</button>
	);
}

export default IncreaseItemQuantity;
