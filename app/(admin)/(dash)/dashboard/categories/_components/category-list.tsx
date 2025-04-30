"use client";
import { CategoryDocument } from "@/models/category";
import Image from "next/image";
import commaNumber from "comma-number";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/admin";
import { useState } from "react";
import { handleError } from "@/lib/handleError";
import { format } from "date-fns";
import { LuArrowLeft, LuArrowRight, LuEye, LuPlus } from "react-icons/lu";
import Link from "next/link";
import DeleteBtn from "./delete-btn";

function CategoryList() {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const { isPending, isError, error, data, isFetching } = useQuery({
		queryKey: ["categories", page, query],
		queryFn: ({ signal }) => getCategories(page, query, signal),
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
	});

	const { docs, totalDocs, limit, hasNextPage, hasPrevPage, isPlaceholderData } = data || {};

	type CategoryWithStringId = Omit<CategoryDocument, "_id"> & { _id: string };

	return (
		<div className="card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Categories</h2>
				<div>
					<Link
						className="btn btn-primary max-sm:btn-square max-sm:btn-sm"
						href="/dashboard/categories/new">
						<LuPlus className="size-5" />
						<span className="max-sm:hidden">
							Add new category
						</span>
					</Link>
				</div>
				<div className="text-right flex font-bold">
					<div className="w-72 ml-auto pr-5">
						{isPending ? (
							<div className="skeleton h-10" />
						) : (
							<span>
								{Math.max(1, limit * (page - 1))} -{" "}
								{limit * (page - 1) +
									docs?.length || 0}{" "}
								of {commaNumber(totalDocs)}
							</span>
						)}
					</div>
				</div>
				<form action="" className="px-5 mb-5 mt-5">
					<div className="form-control">
						<input
							type="search"
							className="input input-bordered"
							placeholder="Category name..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
				</form>
				<div className="overflow-x-auto">
					<table className="table table-zebra">
						{/* head */}
						<thead>
							<tr>
								<th>Name</th>
								<th className="max-sm:hidden">
									Created At/Updated At
								</th>
								<th className="max-sm:hidden">
									Created By
								</th>
								<th className="max-sm:hidden"></th>
							</tr>
						</thead>
						<tbody>
							{isPending ? (
								<tr>
									<td
										colSpan={4}
										className="text-center">
										<div className="skeleton h-10" />
									</td>
								</tr>
							) : isError ? (
								<tr>
									<td
										colSpan={4}
										className="text-center">
										<div
											className="alert alert-error"
											role="alert">
											{handleError(
												error
											)}
										</div>
									</td>
								</tr>
							) : data?.docs.length === 0 ? (
								<tr>
									<td
										colSpan={4}
										className="text-center">
										<div
											className="alert alert-warning"
											role="alert">
											No
											categories
											found
										</div>
									</td>
								</tr>
							) : (
								data?.docs.map(
									(
										category: CategoryWithStringId
									) => (
										<tr
											key={
												category._id
											}
											className="max-sm:flex max-sm:flex-col">
											<td>
												<div className="flex items-center gap-3">
													<div className="avatar">
														<div className="mask mask-squircle size-12 relative">
															<Image
																src={
																	category.cover_image
																}
																alt={
																	category.name
																}
																fill
																sizes="48px"
																placeholder="blur"
																blurDataURL={
																	category.coverImagePlaceholder
																}
															/>
														</div>
													</div>
													<div>
														<div className="font-bold">
															{
																category.name
															}
														</div>
													</div>
												</div>
											</td>
											<td>
												{format(
													new Date(
														category.createdAt
													),
													"PPP"
												)}
												<br />
												<span className="badge badge-ghost badge-sm">
													{format(
														new Date(
															category.updatedAt
														),
														"PPP"
													)}
												</span>
											</td>
											<td className="max-sm:text-sm">
												<span className="sm:hidden mr-1 font-bold">
													Created
													By:
												</span>
												{typeof category._creatorId ===
													"object" &&
												"firstname" in
													category._creatorId
													? category
															._creatorId
															.firstname
													: "Admin Control"}
											</td>
											<th className="space-x-2 ">
												<DeleteBtn
													categoryId={
														category._id
													}
												/>
												<Link
													className="btn btn-xs btn-square"
													href={`/dashboard/categories/${category._id}`}>
													<LuEye />
												</Link>
											</th>
										</tr>
									)
								)
							)}
						</tbody>
					</table>
				</div>

				{isFetching ? (
					<div className="text-center mt-5">
						<span className="loading loading-spinner"></span>
						<span className="animate-pulse"> Loading...</span>
					</div>
				) : null}

				<div className="text-center space-x-5 mt-5 mb-20">
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

export default CategoryList;
