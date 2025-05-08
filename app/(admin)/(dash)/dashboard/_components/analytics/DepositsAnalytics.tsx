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
import { getDepositsAnalytics } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import commaNumber from "@/utils/comma-number";
import { format, subDays } from "date-fns";

export default function DepositsAnalytics() {
	const [filters, setFilters] = useState({
		startDate: format(subDays(new Date(), 30), "yyyy-MM-dd"),
		endDate: format(new Date(), "yyyy-MM-dd"),
		status: "",
	});
	const [queryParams, setQueryParams] = useState(filters);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["analytics", "deposits", queryParams],
		queryFn: () => getDepositsAnalytics(queryParams),
	});

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		setFilters((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleApplyFilters = () => {
		setQueryParams(filters);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64 bg-base-100">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	}

	if (isError) {
		return <div className="alert alert-error">{handleError(error)}</div>;
	}

	const { chartData, totalDeposits, totalAmount, averageDeposit } = data;

	return (
		<div className="card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Deposits Analytics</h2>

				{/* Filters */}
				<div className="flex gap-4 mb-4">
					<input
						type="date"
						name="startDate"
						value={filters.startDate}
						onChange={handleFilterChange}
						className="input input-bordered w-full max-w-xs"
						// min={format(subDays(new Date(), 30), "yyyy-MM-dd")}
						max={format(new Date(), "yyyy-MM-dd")}
					/>
					<input
						type="date"
						name="endDate"
						value={filters.endDate}
						onChange={handleFilterChange}
						className="input input-bordered w-full max-w-xs"
						min={format(
							new Date(filters.startDate),
							"yyyy-MM-dd"
						)}
						max={format(new Date(), "yyyy-MM-dd")}
					/>
					<select
						name="status"
						value={filters.status}
						onChange={handleFilterChange}
						className="select select-bordered w-full max-w-xs">
						<option value="">All Status</option>
						<option value="pending">Pending</option>
						<option value="requires_action">
							Requires Action
						</option>
						<option value="success">Success</option>
						<option value="failed">Failed</option>
					</select>
					<button
						onClick={handleApplyFilters}
						className="btn btn-primary">
						Apply Filters
					</button>
				</div>

				{/* Stats */}
				<div className="stats shadow">
					<div className="stat">
						<div className="stat-title">Total Deposits</div>
						<div className="stat-value">
							{commaNumber(totalDeposits, {
								style: "decimal",
							})}
						</div>
					</div>
					<div className="stat">
						<div className="stat-title">Total Amount</div>
						<div className="stat-value">
							{commaNumber(totalAmount)}
						</div>
					</div>
					<div className="stat">
						<div className="stat-title">Average Deposit</div>
						<div className="stat-value">
							{commaNumber(averageDeposit)}
						</div>
					</div>
				</div>

				{/* Chart */}
				{chartData.length > 0 && (
					<div className="h-96 mt-4">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={chartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis yAxisId="left" />
								<YAxis
									yAxisId="right"
									orientation="right"
								/>
								<Tooltip />
								<Line
									yAxisId="left"
									type="monotone"
									dataKey="amount"
									stroke="#8884d8"
									name="Amount"
								/>
								<Line
									yAxisId="right"
									type="monotone"
									dataKey="count"
									stroke="#82ca9d"
									name="Count"
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				)}
			</div>
		</div>
	);
}
