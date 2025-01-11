"use client";
import { CategoryDocument } from "@/models/category";
import { PaginateResult } from "mongoose";
import Image from "next/image";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api";
import { useState } from "react";
import { handleError } from "@/lib/handleError";
import { format } from "date-fns";

function CategoryList({ initialData }: { initialData: PaginateResult<CategoryDocument> }) {
	console.log(initialData);
	// const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const { isPending, isError, error, data, isFetching } = useQuery({
		queryKey: ["categories", page],
		queryFn: () => getCategories(page),
		initialData,
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
	});

	return (
		<div className="card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Categories</h2>
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th>Name</th>
								<th>Created At/Updated At</th>
								<th>Created By</th>
								<th></th>
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
										category: CategoryDocument
									) => (
										<tr
											key={
												category._id
											}>
											<td>
												{
													category.coverImagePlaceholder
												}
												<div className="flex items-center gap-3">
													<div className="avatar">
														<div className="mask mask-squircle h-12 w-12 relative">
															<Image
																src={
																	category.cover_image
																}
																alt="Avatar Tailwind CSS Component"
																fill
															/>
														</div>
													</div>
													<div>
														<div className="font-bold">
															{
																category.name
															}
														</div>
														{/* <div className="text-sm opacity-50">United States</div> */}
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
											<td>
												{
													category
														._creatorId
														.firstname
												}
											</td>
											<th>
												<button className="btn btn-xs btn-error">
													Delete
												</button>
											</th>
										</tr>
									)
								)
							)}
							{/* row 1 */}
							<tr>
								<td>
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle h-12 w-12 relative">
												<Image
													src="https://img.daisyui.com/images/profile/demo/2@94.webp"
													alt="Avatar Tailwind CSS Component"
													fill
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">
												Hart
												Hagerty
											</div>
											{/* <div className="text-sm opacity-50">United States</div> */}
										</div>
									</div>
								</td>
								<td>
									12th Feburary, 2025
									<br />
									<span className="badge badge-ghost badge-sm">
										12th Feburary, 2025
									</span>
								</td>
								<td>Admin Control</td>
								<th>
									<button className="btn btn-xs btn-error">
										Delete
									</button>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default CategoryList;
