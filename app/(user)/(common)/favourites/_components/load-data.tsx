"use client";

import { getFavourites } from "@/api";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import { useQuery } from "@tanstack/react-query";
import NoFavourites from "./no-favourites";
import BrowseList from "../../_components/browse-list";

function LoadData() {
	const anonymousSession = getAnonymousSessionId();
	const { data: favourites, isLoading } = useQuery({
		queryKey: ["favourites", { full: true }],
		queryFn: () => getFavourites({ sessionId: anonymousSession, full: true }),
	});

	if (isLoading) return <div>Loading...</div>;

	if (favourites?.data.length === 0) return <NoFavourites />;

	return <BrowseList items={favourites.data} />;
}

export default LoadData;
