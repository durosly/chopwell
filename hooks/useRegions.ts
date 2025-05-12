import {
	createRegion,
	deleteRegion,
	getRegionAnalytics,
	getRegions,
	updateRegion,
} from "@/api/admin";
import { Region, RegionAnalytics, ToastRef } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/lib/handleError";
let toastRef: ToastRef;

export const useRegions = () => {
	return useQuery<Region[]>({
		queryKey: ["regions"],
		queryFn: getRegions,
	});
};

export const useRegionAnalytics = () => {
	return useQuery<RegionAnalytics[]>({
		queryKey: ["region-analytics"],
		queryFn: getRegionAnalytics,
	});
};

export const useCreateRegion = () => {
	const queryClient = useQueryClient();
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Creating region...", { duration: Infinity });
		},
		mutationFn: async (newRegion: Omit<Region, "_id">) => createRegion(newRegion),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["regions"] });
			queryClient.invalidateQueries({ queryKey: ["region-analytics"] });
			toast.success("Region created successfully", { id: toastRef });
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Something went wrong", { id: toastRef, description: message });
		},

		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};

export const useUpdateRegion = () => {
	const queryClient = useQueryClient();
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Updating region...", { duration: Infinity });
		},
		mutationFn: async ({ _id, ...region }: Region) => updateRegion(_id, region),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["regions"] });
			queryClient.invalidateQueries({ queryKey: ["region-analytics"] });
			toast.success("Region updated successfully", { id: toastRef });
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Something went wrong", { id: toastRef, description: message });
		},

		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};

export const useDeleteRegion = () => {
	const queryClient = useQueryClient();
	return useMutation({
		onMutate: () => {
			toastRef = toast.loading("Deleting region...", { duration: Infinity });
		},
		mutationFn: async (id: string) => deleteRegion(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["regions"] });
			queryClient.invalidateQueries({ queryKey: ["region-analytics"] });
			toast.success("Region deleted successfully", { id: toastRef });
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Something went wrong", { id: toastRef, description: message });
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef);
			}, 5000);
		},
	});
};
