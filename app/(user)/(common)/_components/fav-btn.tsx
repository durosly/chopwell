"use client";

import { addItemToFavourite, removeItemFromFavourite } from "@/api";
import { handleError } from "@/lib/handleError";
import useFavouriteStore from "@/store/favourite-store";
import { cn } from "@/utils/cn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

type FavBtnProps = PropsWithChildren<{
	className?: string | undefined;
	foodId: string;
	activeClassName?: string | undefined;
}>;

function FavBtn({ className, activeClassName, children, foodId }: FavBtnProps) {
	const queryClient = useQueryClient();
	const { isFavourite, addFavourite, removeFavourite } = useFavouriteStore();

	const favourite = isFavourite(foodId);

	const { isPending, mutate } = useMutation({
		mutationFn: ({ foodId }: { foodId: string }) =>
			favourite
				? removeItemFromFavourite({ foodId })
				: addItemToFavourite({ foodId }),
		onError: (error) => {
			const message = handleError(error);
			toast.error("Favourite failed", { description: message });
		},
		onSuccess: () => {
			(() => (favourite ? removeFavourite(foodId) : addFavourite(foodId)))();
			queryClient.invalidateQueries({ queryKey: ["favourites"] });
		},
	});

	return (
		<button
			disabled={isPending}
			onClick={() => mutate({ foodId })}
			className={cn("fav-btn", className, favourite && activeClassName)}>
			{children}
		</button>
	);
}

export default FavBtn;
