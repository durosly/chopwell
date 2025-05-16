"use client";

import { useDeleteItemFromCart } from "@/hooks/useCart";
import { LuX } from "react-icons/lu";

type PropType = {
	cartItemId: string;
};

function RemoveCartItemBtn({ cartItemId }: PropType) {
	const { mutate, isPending } = useDeleteItemFromCart();

	return (
		<button
			className="cursor-pointer"
			disabled={isPending}
			onClick={() => mutate({ cartItemId })}>
			<LuX className="size-5" />
		</button>
	);
}

export default RemoveCartItemBtn;
