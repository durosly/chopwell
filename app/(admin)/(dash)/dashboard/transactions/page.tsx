"use client";

import { useState } from "react";
import { useTransactions } from "./hooks";
import { TransactionFilters, TransactionStatus, TransactionType } from "./types";

import {
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import commaNumber from "@/utils/comma-number";
import { format, subDays } from "date-fns";

const COLORS = {
	success: "#10B981",
	pending: "#F59E0B",
	failed: "#EF4444",
};

const TRANSACTION_TYPES = ["deposit", "withdrawal", "purchase", "refund"] as const;
const TRANSACTION_STATUSES = ["pending", "success", "failed"] as const;

export default function TransactionsPage() {
	const [filters, setFilters] = useState<TransactionFilters>({
		startDate: format(subDays(new Date(), 30), "yyyy-MM-dd"),
		endDate: format(new Date(), "yyyy-MM-dd"),
	});
	const { data: transactions, isLoading, error } = useTransactions(filters);

	const metrics = transactions?.reduce(
		(acc, tx) => ({
			totalTransactions: acc.totalTransactions + 1,
			totalRevenue: acc.totalRevenue + (tx.status === "success" ? tx.amount : 0),
			pendingTransactions:
				acc.pendingTransactions + (tx.status === "pending" ? 1 : 0),
			failedTransactions:
				acc.failedTransactions + (tx.status === "failed" ? 1 : 0),
		}),
		{
			totalTransactions: 0,
			totalRevenue: 0,
			pendingTransactions: 0,
			failedTransactions: 0,
		}
	);

	const statusData = transactions?.reduce(
		(acc, tx) => {
			acc[tx.status] = (acc[tx.status] || 0) + 1;
			return acc;
		},
		{} as Record<TransactionStatus, number>
	);

	const typeData = transactions?.reduce(
		(acc, tx) => {
			acc[tx.type] = (acc[tx.type] || 0) + 1;
			return acc;
		},
		{} as Record<TransactionType, number>
	);

	const revenueData = transactions?.reduce(
		(acc, tx) => {
			const date = new Date(tx.createdAt).toLocaleDateString();
			if (tx.status === "success") {
				acc[date] = (acc[date] || 0) + tx.amount;
			}
			return acc;
		},
		{} as Record<string, number>
	);

	if (error) {
		return (
			<div className="alert alert-error">
				<span>Error loading transactions</span>
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Transactions</h1>

			{/* Filters */}
			<div className="flex flex-wrap gap-4 p-4 bg-base-200 rounded-lg">
				<select
					className="select select-bordered w-full max-w-xs"
					value={filters.status || ""}
					onChange={(e) =>
						setFilters({
							...filters,
							status: e.target.value as TransactionStatus,
						})
					}>
					<option value="">All Statuses</option>
					{TRANSACTION_STATUSES.map((status) => (
						<option key={status} value={status}>
							{status.charAt(0).toUpperCase() +
								status.slice(1)}
						</option>
					))}
				</select>

				<select
					className="select select-bordered w-full max-w-xs"
					value={filters.type || ""}
					onChange={(e) =>
						setFilters({
							...filters,
							type: e.target.value as TransactionType,
						})
					}>
					<option value="">All Types</option>
					{TRANSACTION_TYPES.map((type) => (
						<option key={type} value={type}>
							{type.charAt(0).toUpperCase() +
								type.slice(1)}
						</option>
					))}
				</select>

				<input
					type="date"
					className="input input-bordered w-full max-w-xs"
					value={filters.startDate || ""}
					onChange={(e) =>
						setFilters({
							...filters,
							startDate: e.target.value,
						})
					}
					max={format(new Date(), "yyyy-MM-dd")}
				/>

				<input
					type="date"
					className="input input-bordered w-full max-w-xs"
					value={filters.endDate || ""}
					onChange={(e) =>
						setFilters({ ...filters, endDate: e.target.value })
					}
					min={format(new Date(filters.startDate), "yyyy-MM-dd")}
					max={format(new Date(), "yyyy-MM-dd")}
				/>
			</div>

			{/* Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="stat bg-base-100 shadow rounded-lg">
					<div className="stat-title">Total Transactions</div>
					<div className="stat-value">
						{metrics?.totalTransactions || 0}
					</div>
				</div>
				<div className="stat bg-base-100 shadow rounded-lg">
					<div className="stat-title">Total Revenue</div>
					<div className="stat-value">
						{commaNumber(metrics?.totalRevenue || 0)}
					</div>
				</div>
				<div className="stat bg-base-100 shadow rounded-lg">
					<div className="stat-title">Pending</div>
					<div className="stat-value">
						{metrics?.pendingTransactions || 0}
					</div>
				</div>
				<div className="stat bg-base-100 shadow rounded-lg">
					<div className="stat-title">Failed</div>
					<div className="stat-value">
						{metrics?.failedTransactions || 0}
					</div>
				</div>
			</div>

			{/* Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-base-100 p-4 rounded-lg shadow">
					<h3 className="text-lg font-semibold mb-4">
						Revenue Over Time
					</h3>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={Object.entries(
									revenueData || {}
								).map(([date, amount]) => ({
									date,
									amount,
								}))}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Line
									type="monotone"
									dataKey="amount"
									stroke="#8884d8"
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-base-100 p-4 rounded-lg shadow">
						<h3 className="text-lg font-semibold mb-4">
							Status Breakdown
						</h3>
						<div className="h-[300px]">
							<ResponsiveContainer
								width="100%"
								height="100%">
								<PieChart>
									<Pie
										data={Object.entries(
											statusData ||
												{}
										).map(
											([
												status,
												count,
											]) => ({
												name: status,
												value: count,
											})
										)}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										outerRadius={80}
										label>
										{Object.entries(
											statusData ||
												{}
										).map(
											([
												status,
											]) => (
												<Cell
													key={
														status
													}
													fill={
														COLORS[
															status as TransactionStatus
														]
													}
												/>
											)
										)}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>

					<div className="bg-base-100 p-4 rounded-lg shadow">
						<h3 className="text-lg font-semibold mb-4">
							Type Breakdown
						</h3>
						<div className="h-[300px]">
							<ResponsiveContainer
								width="100%"
								height="100%">
								<PieChart>
									<Pie
										data={Object.entries(
											typeData ||
												{}
										).map(
											([
												type,
												count,
											]) => ({
												name: type,
												value: count,
											})
										)}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										outerRadius={80}
										label>
										{Object.entries(
											typeData ||
												{}
										).map(([type]) => (
											<Cell
												key={
													type
												}
												fill={`hsl(${Math.random() * 360}, 70%, 50%)`}
											/>
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>

			{/* Transactions Table */}
			<div className="bg-base-100 rounded-lg shadow overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th>User</th>
							<th>Type</th>
							<th>Amount</th>
							<th>Status</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<tr>
								<td
									colSpan={5}
									className="text-center">
									<span className="loading loading-spinner loading-md"></span>
								</td>
							</tr>
						) : (
							transactions?.map((tx) => (
								<tr key={tx._id}>
									<td>
										{tx.user?.name ||
											tx.userId}
									</td>
									<td className="capitalize">
										{tx.type}
									</td>
									<td>
										{commaNumber(
											tx.amount
										)}
									</td>
									<td>
										<span
											className={`badge badge-${tx.status === "success" ? "success" : tx.status === "pending" ? "warning" : "error"}`}>
											{tx.status}
										</span>
									</td>
									<td>
										{new Date(
											tx.createdAt
										).toLocaleDateString()}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
