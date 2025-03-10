"use client";

import { removeCartItem } from "@/api";
import IconTrash from "@/icons/trash";
import { handleError } from "@/lib/handleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type PropType = {
	cartItemId: string;
};

function RemoveCartItemBtn({ cartItemId }: PropType) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ cartItemId }: PropType) => {
			return removeCartItem({ cartItemId });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart-full-data"] });
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			toast.success("Success", { description: "Item removed from cart" });
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Error", { description: message });
		},
	});

	return (
		<button
			className="btn btn-sm btn-accent"
			disabled={isPending}
			onClick={() => mutate({ cartItemId })}>
			<IconTrash className="w-5 h-5" /> Remove
		</button>
	);
}

export default RemoveCartItemBtn;
