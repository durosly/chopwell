"use client";

import { getFavourites } from "@/api";
import useFavouriteStore from "@/store/favourite-store";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function LoadFavourites() {
	const { updateFavourites } = useFavouriteStore();
	const anonymousSession = getAnonymousSessionId();
	const {
		data: favourites,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["favourites"],
		queryFn: () => getFavourites({ sessionId: anonymousSession }),
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
