"use client";

import { useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getOrdersAnalytics } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import commaNumber from "@/utils/comma-number";
import { subDays, format } from "date-fns";

export default function OrdersAnalytics() {
	const [filters, setFilters] = useState({
		startDate: format(subDays(new Date(), 30), "yyyy-MM-dd"),
		endDate: format(new Date(), "yyyy-MM-dd"),
		status: "",
	});

	const [appliedFilters, setAppliedFilters] = useState(filters);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["analytics", "orders", appliedFilters],
		queryFn: () => getOrdersAnalytics(appliedFilters),
	});

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		setFilters((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleApplyFilters = () => {
		setAppliedFilters(filters);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64 bg-base-100">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="alert alert-error">
				<span>{handleError(error)}</span>
			</div>
		);
	}

	const { totalOrders, revenue, chartData } = data;

	return (
		<div className="card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Orders Analytics</h2>

				{/* Filters */}
				<div className="flex flex-col sm:flex-row gap-4 mb-4">
					<div className="form-control w-full max-w-xs">
						<input
							type="date"
							name="startDate"
							value={filters.startDate}
							onChange={handleFilterChange}
							className="input input-bordered w-full"
							max={format(new Date(), "yyyy-MM-dd")}
						/>
					</div>
					<div className="form-control w-full max-w-xs">
						<input
							type="date"
							name="endDate"
							value={filters.endDate}
							onChange={handleFilterChange}
							className="input input-bordered w-full"
							min={format(
								new Date(filters.startDate),
								"yyyy-MM-dd"
							)}
							max={format(new Date(), "yyyy-MM-dd")}
						/>
					</div>
					<div className="form-control w-full max-w-xs">
						<select
							name="status"
							value={filters.status}
							onChange={handleFilterChange}
							className="select select-bordered w-full">
							<option value="">All Status</option>

							<option value="pending">Pending</option>
							<option value="preparing">Preparing</option>
							<option value="delivering">
								Delivering
							</option>
							<option value="successful">
								Successful
							</option>
						</select>
					</div>
					<button
						onClick={handleApplyFilters}
						className="btn btn-primary w-full sm:w-auto">
						Apply Filters
					</button>
				</div>

				{/* Stats */}
				<div className="stats stats-vertical lg:stats-horizontal w-full">
					<div className="stat">
						<div className="stat-title">Total Orders</div>
						<div className="stat-value text-primary">
							{commaNumber(totalOrders, {
								style: "decimal",
							})}
						</div>
					</div>
					<div className="stat">
						<div className="stat-title">Total Revenue</div>
						<div className="stat-value">
							{commaNumber(revenue)}
						</div>
					</div>
					<div className="stat">
						<div className="stat-title">
							Average Order Value
						</div>
						<div className="stat-value">
							{commaNumber(revenue / totalOrders || 0)}
						</div>
					</div>
				</div>

				{/* Chart */}
				{chartData.length > 0 && (
					<div className="h-[300px] sm:h-[400px] lg:h-[500px] mt-4">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={chartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Line
									type="monotone"
									dataKey="total"
									stroke="#8884d8"
									strokeWidth={2}
								/>
								<Line
									type="monotone"
									dataKey="count"
									stroke="#82ca9d"
									strokeWidth={2}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				)}
			</div>
		</div>
	);
}
