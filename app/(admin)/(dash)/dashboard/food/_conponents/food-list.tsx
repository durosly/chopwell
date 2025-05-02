"use client";
import { getFoods } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import FilterForm from "./filter-form";
import commaNumber from "@/utils/comma-number";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { FoodDocument } from "@/models/food";

type PopulatedFoodDocument = Omit<FoodDocument, "_categoryId" | "_creatorId"> & {
	_id: string;
	_categoryId: { _id: string; name: string; slug: string };
	_creatorId: { _id: string; firstname: string; lastname: string };
};

function FoodList() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("search") ?? undefined;
	const category = searchParams.get("category") ?? undefined;
	const subCategory = searchParams.get("subcategory") ?? undefined;
	const page = Number(searchParams.get("page")) || 1;

	const { isPending, isError, error, data, isFetching } = useQuery({
		queryKey: ["foods", page, query, category, subCategory],
		queryFn: ({ signal }) => getFoods({ page, query, category, subCategory, signal }),
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
	});

	const { docs, totalDocs, limit, hasNextPage, hasPrevPage, isPlaceholderData } =
		data?.data || {};

	return (
		<>
			<FilterForm />

			<div className="text-right flex font-bold">
				<div className="w-72 ml-auto pr-5">
					{isPending ? (
						<div className="skeleton h-10" />
					) : (
						<span>
							{Math.max(1, limit * (page - 1))} -{" "}
							{limit * (page - 1) + docs?.length || 0} of{" "}
							{commaNumber(totalDocs, {
								style: "decimal",
							})}
						</span>
					)}
				</div>
			</div>
			{/* Food Items Grid */}
			{isPending ? (
				<div className="text-center mt-5">
					<span className="loading loading-spinner"></span>
					<span className="animate-pulse"> Loading...</span>
				</div>
			) : isError ? (
				<div className="alert alert-error alert-soft mt-5">
					<span className="text-error">
						Error: {handleError(error)}
					</span>
				</div>
			) : docs.length === 0 ? (
				<div className="text-center mt-5">
					<span className="text-error">No foods found</span>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{docs?.map((food: PopulatedFoodDocument) => (
						<Link
							href={`/admin/dashboard/food/${food._id}`}
							key={food._id}
							className="card bg-base-100 group">
							<figure className="relative h-48">
								<Image
									src={food.image}
									alt={food.name}
									fill
									{...(food.coverImagePlaceholder && {
										placeholder: "blur",
										blurDataURL:
											food.coverImagePlaceholder,
									})}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								{!food.available && (
									<div className="badge badge-error absolute top-2 right-2">
										Unavailable
									</div>
								)}
							</figure>
							<div className="card-body p-4">
								<h3 className="card-title">
									{food.name}
								</h3>
								<div className="flex justify-between items-center mb-2">
									<span className="text-base-content/70">
										{food?._categoryId
											?.name ||
											"No category"}
									</span>
									<span className="font-bold">
										{commaNumber(
											food.price
										)}
									</span>
								</div>
								<div className="flex flex-wrap justify-between items-center text-sm gap-5">
									<div className="flex items-center gap-1">
										<span className="text-base-content/70">
											Rating:
										</span>
										<span className="font-semibold">
											{
												food.average_rating
											}
										</span>
									</div>
									<div className="flex items-center gap-1">
										<span className="text-base-content/70">
											Created by:
										</span>
										<span className="font-semibold">
											{food
												?._creatorId
												?.firstname ||
												"Admin Control"}
										</span>
									</div>
									<div className="flex items-center gap-1">
										<span className="text-base-content/70">
											Created at:
										</span>
										<span className="font-semibold text-primary">
											{format(
												new Date(
													food.createdAt
												),
												"PPP"
											)}
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}

			{!isPending && isFetching ? (
				<div className="text-center mt-5">
					<span className="loading loading-spinner"></span>
					<span className="animate-pulse"> Loading...</span>
				</div>
			) : null}

			{/* Pagination */}
			<div className="text-center space-x-5 mt-5 mb-20">
				<button
					disabled={!hasPrevPage}
					className="btn btn-sm btn-outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral"
					onClick={() =>
						router.push(`/dashboard/food?page=${page - 1}`)
					}>
					<LuArrowLeft />
				</button>
				<span className="">Page {page}</span>
				<button
					disabled={!hasNextPage || isPlaceholderData}
					className="btn btn-sm btn-outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral"
					onClick={() => {
						if (!isPlaceholderData && hasNextPage) {
							router.push(
								`/dashboard/food?page=${page + 1}`
							);
						}
					}}>
					<LuArrowRight />
				</button>
			</div>
		</>
	);
}

export default FoodList;
