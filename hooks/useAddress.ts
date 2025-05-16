import { getUserAddress, makeAddressDefault } from "@/api";
import { ToastRef } from "@/types";
import { getQueryClient } from "@/lib/query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/lib/handleError";
let toastRef: ToastRef;

const queryClient = getQueryClient();

function updateQueries(queryKey: string[]) {
	queryKey.map((key) => {
		queryClient.invalidateQueries({ queryKey: [key] });
	});
}

export const useUserAddress = () => {
	return useQuery({ queryKey: ["user-address"], queryFn: () => getUserAddress() });
};

export const useMakeAddressDefault = () => {
	return useMutation({
		mutationFn: (addressId: string) => makeAddressDefault(addressId),
		onMutate: () => {
			toastRef = toast.loading("Updating address...", { duration: Infinity });
		},
		onSuccess: () => {
			toast.success("Address updated successfully", { id: toastRef });
			updateQueries(["user-address", "cart-full-data"]);
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Something went wrong", { id: toastRef, description: message });
		},
		onSettled: () => {
			setTimeout(() => toast.dismiss(toastRef), 5000);
		},
	});
};
