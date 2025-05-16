import {
	addItemToCart,
	addNewCartGroup,
	clearCart,
	copyCartItem,
	deleteCartGroup,
	getCart,
	moveCartItem,
	removeCartItem,
	updateCartGroupTitle,
	updateItemQuantityInCart,
} from "@/api";
import { handleError } from "@/lib/handleError";
import { getQueryClient } from "@/lib/query-client";
import { ToastRef } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

let toastRef: ToastRef;

const queryClient = getQueryClient();

function updateQueries(queryKey: string[]) {
	queryKey.map((key) => {
		queryClient.invalidateQueries({ queryKey: [key] });
	});
}

export const useGetUserCart = () => {
	return useQuery({
		queryKey: ["cart-full-data"],
		queryFn: () => getCart(),
		refetchOnWindowFocus: false,
	});
};

type ClearCartProps = { onSuccess?: () => void; onError?: (error: Error) => void };

export const useClearCart = ({ onSuccess, onError }: ClearCartProps) => {
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Clearing cart...", { duration: Infinity });
		},
		mutationFn: () => {
			return clearCart();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart-full-data"] });
			queryClient.invalidateQueries({ queryKey: ["cart"] });

			if (onSuccess) onSuccess();

			toast.success("Success", {
				description: `Cart cleared successfully`,
				id: toastRef,
			});
		},
		onError: (error) => {
			if (onError) onError(error);
			const message = handleError(error);
			toast.error("Something went wrong", { description: message, id: toastRef });
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};

export const useDeleteItemFromCart = () => {
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Removing item...", { duration: Infinity });
		},
		mutationFn: async ({ cartItemId }: { cartItemId: string }) => {
			return removeCartItem({ cartItemId });
		},
		onSuccess: () => {
			updateQueries(["cart", "cart-full-data"]);
			toast.success("Success", {
				description: "Item removed from cart",
				id: toastRef,
			});
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Error", { description: message, id: toastRef });
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};

export const useToggleCartItem = ({
	inCart,
	onSuccess,
	onError,
}: {
	inCart: boolean;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Adding item...", { duration: Infinity });
		},
		mutationFn: ({ foodId }: { foodId: string }) =>
			inCart ? removeCartItem({ cartItemId: foodId }) : addItemToCart({ foodId }),
		onError: (error) => {
			const message = handleError(error);
			toast.error("Cart failed", { description: message, id: toastRef });
			if (onError) onError(error);
		},
		onSuccess: () => {
			if (onSuccess) onSuccess();
			updateQueries(["cart", "cart-full-data"]);
			toast.success("Success", {
				description: "Item added to cart",
				id: toastRef,
			});
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};

export const useAddNewCartGroup = () => {
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Adding new group...", {
				duration: Infinity,
			});
		},
		mutationFn: () => {
			return addNewCartGroup();
		},
		onSuccess: () => {
			updateQueries(["cart-full-data"]);
			toast.success("Group added successfully", {
				id: toastRef,
			});
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Error", {
				description: message,
				id: toastRef,
			});
		},

		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};

export const useDeleteCartGroup = ({
	title,
	onSuccess,
	onError,
}: {
	title: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Deleting group...", {
				duration: Infinity,
			});
		},
		mutationFn: ({ groupId }: { groupId: string }) => {
			return deleteCartGroup({ id: groupId });
		},
		onSuccess: () => {
			updateQueries(["cart-full-data"]);

			toast.success("Success", {
				description: `Cart group(${title}) deleted successfully`,
				id: toastRef,
			});

			if (onSuccess) onSuccess();
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Error", { description: message, id: toastRef });
			if (onError) onError(error);
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};

export const useUpdateCartGroupTitle = ({
	groupId,
	onSuccess,
	onError,
}: {
	groupId: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Updating group title...", {
				duration: Infinity,
			});
		},
		mutationFn: (data: { title: string }) => {
			return updateCartGroupTitle({ id: groupId, title: data.title });
		},
		onSuccess: () => {
			updateQueries(["cart-full-data"]);

			toast.success("Success", {
				description: "Group title updated successfully",
				id: toastRef,
			});

			if (onSuccess) onSuccess();
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Error", { description: message, id: toastRef });
			if (onError) onError(error);
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};

export const useMoveCartItem = () => {
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Moving item...", { duration: Infinity });
		},
		mutationFn: ({ cartItemId, groupId }: { cartItemId: string; groupId: string }) =>
			moveCartItem({ cartItemId, groupId }),
		onSuccess: () => {
			toast.success("Item moved successfully", { id: toastRef });
			updateQueries(["cart-full-data"]);
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, { id: toastRef });
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};

export const useCopyCartItem = () => {
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Copying item...", { duration: Infinity });
		},
		mutationFn: ({ cartItemId, groupId }: { cartItemId: string; groupId: string }) =>
			copyCartItem({ cartItemId, groupId }),
		onSuccess: () => {
			toast.success("Item copied successfully", { id: toastRef });
			updateQueries(["cart-full-data"]);
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, { id: toastRef });
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};

export function useCartItemQuatityUpdate({
	cartItemId,
	onSuccess,
}: {
	cartItemId: string;
	onSuccess?: () => void;
}) {
	return useMutation({
		mutationFn: ({ quantity }: { quantity: number }) => {
			return updateItemQuantityInCart({ cartItemId, quantity });
		},
		onMutate: () => {
			toastRef = toast.loading("Updating cart item quantity...", {
				duration: Infinity,
			});
		},
		onSuccess: () => {
			toast.success("Success", {
				description: `Cart item quantity updated successfully`,
				id: toastRef,
			});
			updateQueries(["cart-full-data"]);
			if (onSuccess) onSuccess();
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Something went wrong", {
				description: message,
				id: toastRef,
			});
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
		scope: {
			id: "update-cart-item",
		},
	});
}
