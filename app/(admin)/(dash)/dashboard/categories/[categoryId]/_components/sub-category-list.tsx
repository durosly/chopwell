"use client";
import { getSubCategoriesByCategoryId } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import { SubCategoryDocument } from "@/models/sub-category";
import commaNumber from "@/utils/comma-number";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";
import DeleteBtn from "./delete-btn";
import Image from "next/image";
import { format } from "date-fns";

function SubCategoryList({ categoryId }: { categoryId: string }) {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);

	const { isPending, isError, error, data, isFetching } = useQuery({
		queryKey: ["subcategories", categoryId, page, query],
		queryFn: ({ signal }) =>
			getSubCategoriesByCategoryId(categoryId, page, query, signal),
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
	});

	const { docs, totalDocs, limit, hasNextPage, hasPrevPage, isPlaceholderData } = data || {};

	return (
		<div className="card bg-base-100">
			<div className="card-body">
				<div className="text-right flex font-bold">
					<div className="w-72 ml-auto pr-5">
						{isPending ? (
							<div className="skeleton h-10" />
						) : (
							<span>
								{Math.max(1, limit * (page - 1))} -{" "}
								{limit * (page - 1) +
									docs?.length || 0}{" "}
								of{" "}
								{commaNumber(totalDocs, {
									style: "decimal",
								})}
							</span>
						)}
					</div>
				</div>
				<form action="" className="px-5 mb-5 mt-5">
					<div className="form-control">
						<input
							type="search"
							className="input input-bordered"
							placeholder="Subcategory name..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
				</form>
				{isPending ? (
					<div className="alert alert-info alert-soft">
						<span className="loading loading-spinner loading-lg"></span>
						<span className="animate-pulse"> Loading...</span>
					</div>
				) : isError ? (
					<div className="alert alert-error alert-soft">
						{handleError(error)}
					</div>
				) : docs?.length === 0 ? (
					<div className="alert alert-warning alert-soft">
						No subcategories found
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="table table-zebra">
							<thead className="hidden md:table-header-group">
								<tr>
									<th>Name</th>
									<th>Actions</th>
									<th>Created on</th>
									<th>Created By</th>
								</tr>
							</thead>
							<tbody>
								{docs.map(
									(
										subcategory: SubCategoryDocument
									) => (
										<tr
											key={
												subcategory._id as string
											}
											className="block md:table-row">
											<td className="block md:table-cell p-4 md:p-2">
												<div className="flex items-center gap-2">
													<div className="size-10 relative rounded-box overflow-hidden">
														<Image
															src={
																subcategory.cover_image
															}
															alt={
																subcategory.name
															}
															fill
															className="object-cover"
															placeholder="blur"
															blurDataURL={
																subcategory.coverImagePlaceholder
															}
														/>
													</div>

													{
														subcategory.name
													}
												</div>
											</td>
											<td className="block md:table-cell p-4 md:p-2">
												<span className="md:hidden mr-1 font-bold">
													Created
													On:
												</span>
												{format(
													new Date(
														subcategory.createdAt
													),
													"PPP"
												)}
											</td>
											<td className="block md:table-cell p-4 md:p-2">
												<span className="md:hidden mr-1 font-bold">
													Created
													By:
												</span>
												{typeof subcategory._creatorId ===
													"object" &&
												"firstname" in
													subcategory._creatorId
													? subcategory
															._creatorId
															.firstname
													: "Admin Control"}
											</td>
											<td className="block md:table-cell p-4 md:p-2">
												<div className="join">
													<Link
														href={`/dashboard/food?category=${categoryId}&subcategory=${subcategory._id}`}
														className="btn btn-sm btn-primary join-item">
														View
													</Link>
													<DeleteBtn
														subCategoryId={
															subcategory._id as string
														}
													/>
												</div>
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</div>
				)}

				{isFetching ? (
					<div className="text-center mt-5">
						<span className="loading loading-spinner"></span>
						<span className="animate-pulse"> Loading...</span>
					</div>
				) : null}

				<div className="text-center space-x-5 mt-5 ">
					<button
						disabled={!hasPrevPage}
						className="btn btn-sm btn-outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral"
						onClick={() =>
							setPage((old) => Math.max(old - 1, 0))
						}>
						<LuArrowLeft />
					</button>
					<span className="">Page {page}</span>
					<button
						disabled={!hasNextPage || isPlaceholderData}
						className="btn btn-sm btn-outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral"
						onClick={() => {
							if (!isPlaceholderData && hasNextPage) {
								setPage((old) => old + 1);
							}
						}}>
						<LuArrowRight />
					</button>
				</div>
			</div>
		</div>
	);
}

export default SubCategoryList;
