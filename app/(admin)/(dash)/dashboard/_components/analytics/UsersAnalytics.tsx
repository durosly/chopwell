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
import { getUsersAnalytics } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import { format, subDays } from "date-fns";

export default function UsersAnalytics() {
	const [filters, setFilters] = useState({
		startDate: format(subDays(new Date(), 30), "yyyy-MM-dd"),
		endDate: format(new Date(), "yyyy-MM-dd"),
	});

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["analytics", "users", filters],
		queryFn: () =>
			getUsersAnalytics({
				dateFrom: filters.startDate,
				dateTo: filters.endDate,
			}),
	});

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
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

	// Process data for charts

	const { totalUsers, chartData } = data;

	return (
		<div className="card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Users Analytics</h2>

				{/* Filters */}
				<div className="flex gap-4 mb-4">
					<input
						type="date"
						name="startDate"
						value={filters.startDate}
						onChange={handleFilterChange}
						className="input input-bordered w-full max-w-xs"
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
				</div>

				{/* Stats */}
				<div className="stats border border-base-200">
					<div className="stat">
						<div className="stat-title">Total Users</div>
						<div className="stat-value">{totalUsers}</div>
					</div>
				</div>
				{chartData.length > 0 && (
					<>
						{/* Chart */}
						<div className="h-96 mt-4">
							<ResponsiveContainer
								width="100%"
								height="100%">
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
										dataKey="newUsers"
										stroke="#8884d8"
										name="New Users"
									/>
									<Line
										yAxisId="right"
										type="monotone"
										dataKey="totalSpent"
										stroke="#82ca9d"
										name="Total Spent"
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
