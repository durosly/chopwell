"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/api";
import { handleError } from "@/lib/handleError";
import { Fragment, useEffect, useRef } from "react";
import BrowseList from "../../_components/browse-list";
import { useSearchParams } from "next/navigation";

function LoadDataWrapper() {
	const searchParams = useSearchParams();
	const query = searchParams.get("query") ?? undefined;
	const minPrice = searchParams.get("minPrice")
		? Number(searchParams.get("minPrice"))
		: undefined;
	const maxPrice = searchParams.get("maxPrice")
		? Number(searchParams.get("maxPrice"))
		: undefined;
	const mealTime = searchParams.get("mealTime") as
		| "breakfast"
		| "lunch"
		| "dinner"
		| undefined;
	const sortBy = searchParams.get("sortBy") as
		| "relevance"
		| "rating"
		| "price-asc"
		| "price-desc"
		| undefined;
	const loadMoreRef = useRef<HTMLDivElement>(null);

	// use tanstack query to create an infinite scroll pagination
	const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ["food-items", query, minPrice, maxPrice, mealTime, sortBy],
			queryFn: ({ pageParam }) =>
				getProducts({
					page: pageParam,
					query,
					minPrice,
					maxPrice,
					mealTime,
					sortBy,
				}),
			getNextPageParam: (lastPage) => {
				return lastPage?.data?.nextPage;
			},
			initialPageParam: 1,
		});

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (
					entries[0].isIntersecting &&
					hasNextPage &&
					!isFetchingNextPage
				) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1 }
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => observer.disconnect();
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
				<div className="loading loading-spinner loading-lg text-primary"></div>
				<p className="text-base-content/60">Loading delicious meals...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="alert alert-error shadow-lg">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="stroke-current shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div>
					<h3 className="font-bold">Error loading meals</h3>
					<div className="text-xs">{handleError(error)}</div>
				</div>
			</div>
		);
	}

	if (data?.pages[0].data.docs.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
				<p className="text-base-content/60">No meals found</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-5 gap-5 py-3 w-full mb-10">
			{data?.pages.map((page) => (
				<Fragment key={page.data.page}>
					<BrowseList items={page.data.docs} />
				</Fragment>
			))}
			<div ref={loadMoreRef} className="h-10 w-full col-span-full">
				{isFetchingNextPage && <div>Loading more...</div>}
			</div>
		</div>
	);
}

export default LoadDataWrapper;
