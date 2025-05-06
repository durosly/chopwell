"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/admin";
import { useState } from "react";
import { handleError } from "@/lib/handleError";
import Link from "next/link";

interface User {
	_id: string;
	firstname: string;
	lastname: string;
	email: string;
	phone?: string;
	disabled: boolean;
	createdAt: string;
}

export default function CustomersList() {
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");

	const { data, isLoading, error, isError } = useQuery({
		queryKey: ["users", page, searchQuery],
		queryFn: ({ signal }) => getUsers({ page, query: searchQuery, signal }),
	});

	if (isError) {
		return <div className="alert alert-error alert-soft">{handleError(error)}</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<div className="mb-4">
				<input
					type="search"
					placeholder="Search customers..."
					className="input input-bordered w-full max-w-xs"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{isLoading ? (
				<div className="flex justify-center">
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			) : (
				<>
					<div className="overflow-x-auto">
						<table className="table table-zebra">
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Status</th>
									<th>Joined</th>
								</tr>
							</thead>
							<tbody>
								{data?.docs.map((user: User) => (
									<tr key={user._id}>
										<td>
											<Link
												href={`/dashboard/customers/${user._id}`}
												className="hover:underline">
												{
													user.firstname
												}{" "}
												{
													user.lastname
												}
											</Link>
										</td>
										<td>
											{user.email ||
												"N/A"}
										</td>
										<td>
											{user.phone ||
												"N/A"}
										</td>
										<td>
											<span
												className={`badge ${
													user.disabled
														? "badge-error"
														: "badge-success"
												}`}>
												{user.disabled
													? "Disabled"
													: "Active"}
											</span>
										</td>
										<td>
											{new Date(
												user.createdAt
											).toLocaleDateString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					<div className="flex justify-center mt-4">
						<div className="join">
							<button
								className="join-item btn"
								onClick={() =>
									setPage((p) =>
										Math.max(1, p - 1)
									)
								}
								disabled={page === 1}>
								«
							</button>
							<button className="join-item btn">
								Page {page} of{" "}
								{data?.totalPages || 1}
							</button>
							<button
								className="join-item btn"
								onClick={() =>
									setPage((p) =>
										Math.min(
											data?.totalPages ||
												1,
											p + 1
										)
									)
								}
								disabled={
									page === data?.totalPages
								}>
								»
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
