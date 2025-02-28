"use client";

import { getFavourites } from "@/api";
import useFavouriteStore from "@/store/favourite-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function LoadFavourites() {
	const { updateFavourites } = useFavouriteStore();
	const {
		data: favourites,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["favourites"],
		queryFn: () => getFavourites({}),
	});

	useEffect(() => {
		if (!isLoading && isSuccess) {
			const data = favourites?.data;
			if (data) {
				updateFavourites(data);
			}
		}
	}, [favourites, isLoading, isSuccess, updateFavourites]);

	return null;
}

export default LoadFavourites;
