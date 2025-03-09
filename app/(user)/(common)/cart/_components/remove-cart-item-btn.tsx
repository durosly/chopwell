"use client";

import { removeItemFromCartGroup } from "@/api";
import IconTrash from "@/icons/trash";
import { handleError } from "@/lib/handleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type PropType = {
	cartItemId: string;
	groupId: string;
};

function RemoveCartItemBtn({ cartItemId, groupId }: PropType) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ cartItemId, groupId }: PropType) => {
			return removeItemFromCartGroup({ cartItemId, groupId });
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
			onClick={() => mutate({ cartItemId, groupId })}>
			<IconTrash className="w-5 h-5" /> Remove
		</button>
	);
}

export default RemoveCartItemBtn;
