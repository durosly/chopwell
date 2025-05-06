"use client";
import { getOrders } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import { OrderDocument } from "@/models/order";
import commaNumber from "@/utils/comma-number";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Types } from "mongoose";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LuArrowLeft, LuArrowRight, LuCircleX, LuInfo } from "react-icons/lu";
import getStatusIcon from "../../_components/get-status-icon";

function OrderList() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const page = Number(searchParams.get("page")) || 1;
	// const limit = searchParams.get("limit") || "10";
	const search = searchParams.get("search") || "";
	const status = searchParams.get("status") || "all";
	const dateFrom = searchParams.get("dateFrom") || "";
	const dateTo = searchParams.get("dateTo") || "";

	const { data, isLoading, isError, error, isFetching } = useQuery({
		queryKey: ["orders", search, status, dateFrom, dateTo, page],
		queryFn: () => getOrders({ search, status, dateFrom, dateTo, page }),
	});

	const updatePage = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		router.push(`?${params.toString()}`);
	};

	if (isLoading) {
		return (
			<div className="space-y-4">
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className="w-full h-8 bg-gray-200 rounded-box skeleton"
					/>
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<div className="alert alert-error">
				<div className="flex-none">
					<LuCircleX className="w-4 h-4" />
				</div>
				<div className="flex-1">
					<h5 className="text-sm font-bold">Error!</h5>
					<p>{handleError(error)}</p>
				</div>
			</div>
		);
	}

	const { docs, totalDocs, limit, hasNextPage, hasPrevPage, isPlaceholderData } =
		data?.orders || {};

	if (docs?.length === 0) {
		return (
			<div className="alert alert-soft">
				<div className="flex-none">
					<LuInfo className="w-4 h-4" />
				</div>
				<div className="flex-1">
					<h5 className="text-sm font-bold">No orders found</h5>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="overflow-x-auto mb-6 card bg-base-100">
				<table className="table w-full">
					<thead>
						<tr>
							<th>Order Code</th>
							<th>User Name</th>
							<th>Status</th>
							<th>Created At</th>
						</tr>
					</thead>
					<tbody>
						{docs?.map((order: OrderDocument) => (
							<tr
								key={(
									order._id as Types.ObjectId
								).toString()}>
								<td className="font-medium">
									<Link
										className="link link-primary"
										href={`/dashboard/orders/${order._id}`}>
										#{order.code}
									</Link>
								</td>
								<td>
									{typeof order._userId ===
										"object" &&
									"_id" in order._userId &&
									"firstname" in order._userId
										? `${order._userId.firstname} ${order._userId.lastname}`
										: "Unknown User"}
								</td>
								<td>
									<span
										className={`badge badge-soft flex items-center gap-1 ${
											order.status ===
											"successful"
												? "badge-success"
												: order.status ===
													  "pending"
													? "badge-warning"
													: order.status ===
														  "preparing"
														? "badge-info"
														: order.status ===
															  "delivering"
															? "badge-info"
															: order.status ===
																  "cancelled"
																? "badge-error"
																: "badge-neutral"
										}`}>
										{getStatusIcon(
											order.status
										)}
										{order.status}
									</span>
								</td>
								<td>
									{format(
										new Date(
											order.createdAt
										),
										"MMM d, yyyy h:mm a"
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isFetching && (
				<div className="flex justify-center items-center">
					<div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
				</div>
			)}

			{/* Pagination */}
			<div className="flex flex-col items-center gap-4">
				<div className="text-sm text-gray-500">
					Showing {Math.max(1, limit * (page - 1))} -{" "}
					{limit * (page - 1) + docs?.length || 0} of{" "}
					{commaNumber(totalDocs, {
						style: "decimal",
					})}{" "}
					orders
				</div>
			</div>
			<div className="text-center space-x-5 mt-5 mb-20">
				<button
					disabled={!hasPrevPage}
					className="btn btn-sm btn-outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral"
					onClick={() => updatePage(Math.max(page - 1, 1))}>
					<LuArrowLeft />
				</button>
				<span className="">Page {page}</span>
				<button
					disabled={!hasNextPage || isPlaceholderData}
					className="btn btn-sm btn-outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral"
					onClick={() => {
						if (!isPlaceholderData && hasNextPage) {
							updatePage(page + 1);
						}
					}}>
					<LuArrowRight />
				</button>
			</div>
		</>
	);
}

export default OrderList;
