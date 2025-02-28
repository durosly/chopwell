"use client";

import { getFavourites } from "@/api";
import { useQuery } from "@tanstack/react-query";
import NoFavourites from "./no-favourites";
import BrowseList from "../../_components/browse-list";

function LoadData() {
	const { data: favourites, isLoading } = useQuery({
		queryKey: ["favourites", { full: true }],
		queryFn: () => getFavourites({ full: true }),
	});

	if (isLoading) return <div>Loading...</div>;

	if (favourites?.data.length === 0) return <NoFavourites />;

	return <BrowseList items={favourites.data} />;
}

export default LoadData;
