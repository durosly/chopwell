"use client";
import { getFoods } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import FilterForm from "./filter-form";
import commaNumber from "@/utils/comma-number";
import Image from "next/image";
import { format } from "date-fns";
import { FoodDocument } from "@/models/food";
import { useRouter } from "nextjs-toploader/app";

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
				<div className="overflow-x-auto">
					<table className="table table-zebra">
						<thead>
							<tr>
								<th>Image</th>
								<th>Name</th>
								<th>Category</th>
								<th>Price</th>
								<th>Rating</th>
								<th>Created By</th>
								<th>Created At</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{docs?.map(
								(food: PopulatedFoodDocument) => (
									<tr
										key={food._id}
										className="hover:bg-base-200 cursor-pointer"
										onClick={() =>
											router.push(
												`/dashboard/food/${food._id}`
											)
										}>
										<td>
											<div className="relative w-16 h-16">
												<Image
													src={
														food.image
													}
													alt={
														food.name
													}
													fill
													{...(food.coverImagePlaceholder && {
														placeholder:
															"blur",
														blurDataURL:
															food.coverImagePlaceholder,
													})}
													sizes="64px"
													className="object-cover rounded-lg"
												/>
											</div>
										</td>
										<td className="font-medium">
											{food.name}
										</td>
										<td>
											{food
												?._categoryId
												?.name ||
												"No category"}
										</td>
										<td className="font-bold">
											{commaNumber(
												food.price
											)}
										</td>
										<td>
											{
												food.average_rating
											}
										</td>
										<td>
											{food
												?._creatorId
												?.firstname ||
												"Admin Control"}
										</td>
										<td className="text-primary">
											{format(
												new Date(
													food.createdAt
												),
												"PPP"
											)}
										</td>
										<td>
											{!food.available && (
												<div className="badge badge-error">
													Unavailable
												</div>
											)}
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
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
