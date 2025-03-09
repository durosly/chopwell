import { updateItemQuantityInCart } from "@/api";
import { handleError } from "@/lib/handleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";

type PropType = {
	cartItemId: string;
};

function useCartItemQuatityUpdate({ cartItemId }: PropType) {
	const queryClient = useQueryClient();
	const toastRef = useRef<string | number | undefined>(undefined);

	const { isPending, mutate, isError, error } = useMutation({
		mutationFn: ({ quantity }: { quantity: number }) => {
			return updateItemQuantityInCart({ cartItemId, quantity });
		},
		onMutate: () => {
			toastRef.current = toast.loading("Updating cart item quantity...");
		},
		onSuccess: () => {
			toast.success("Success", {
				description: `Cart item quantity updated successfully`,
				id: toastRef.current,
			});

			queryClient.invalidateQueries({ queryKey: ["cart-full-data"] });
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Something went wrong", {
				description: message,
				id: toastRef.current,
			});
		},
	});

	return { isPending, mutate, isError, error };
}

export default useCartItemQuatityUpdate;
