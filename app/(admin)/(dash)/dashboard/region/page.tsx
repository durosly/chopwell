"use client";

import { useState } from "react";
import {
	useRegions,
	useCreateRegion,
	useUpdateRegion,
	useDeleteRegion,
	useRegionAnalytics,
} from "@/hooks/useRegions";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";
import commaNumber from "@/utils/comma-number";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface Region {
	_id: string;
	title: string;
	deliveryPrice: number;
}

export default function RegionDashboard() {
	const [isLoading, setIsLoading] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
	const [formData, setFormData] = useState({ title: "", deliveryPrice: 0 });

	const { data: regions, isLoading: isLoadingRegions } = useRegions();
	const { data: analytics, isLoading: isLoadingAnalytics } = useRegionAnalytics();
	const createRegion = useCreateRegion();
	const updateRegion = useUpdateRegion();
	const deleteRegion = useDeleteRegion();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isLoading) return;
		setIsLoading(true);
		try {
			if (selectedRegion) {
				await updateRegion.mutateAsync({ ...selectedRegion, ...formData });
			} else {
				await createRegion.mutateAsync(formData);
			}
			setIsAddModalOpen(false);
			setIsEditModalOpen(false);
			setFormData({ title: "", deliveryPrice: 0 });
			setSelectedRegion(null);
		} catch {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = (region: Region) => {
		setSelectedRegion(region);
		setFormData({ title: region.title, deliveryPrice: region.deliveryPrice });
		setIsEditModalOpen(true);
	};

	const handleDelete = async (id: string) => {
		if (isLoading) return;
		setIsLoading(true);
		if (window.confirm("Are you sure you want to delete this region?")) {
			try {
				await deleteRegion.mutateAsync(id);
			} catch {
				toast.error("Failed to delete region");
			} finally {
				setIsLoading(false);
			}
		}
	};

	if (isLoadingRegions || isLoadingAnalytics) {
		return (
			<div className="flex items-center justify-center h-40">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	}

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Region Management</h1>
				<button
					className="btn btn-primary"
					onClick={() => setIsAddModalOpen(true)}>
					Add New Region
				</button>
			</div>

			{/* Analytics Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<div className="card bg-base-100">
					<div className="card-body">
						<h2 className="card-title">Address Distribution</h2>
						<div className="h-[300px]">
							<ResponsiveContainer
								width="100%"
								height="100%">
								<PieChart>
									<Pie
										data={analytics}
										dataKey="count"
										nameKey="title"
										cx="50%"
										cy="50%"
										outerRadius={100}
										label>
										{analytics?.map(
											(
												entry,
												index
											) => (
												<Cell
													key={`cell-${index}`}
													fill={
														COLORS[
															index %
																COLORS.length
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
				</div>

				<div className="card bg-base-100">
					<div className="card-body">
						<h2 className="card-title">Total Statistics</h2>
						<div className="stats stats-vertical">
							<div className="stat">
								<div className="stat-title">
									Total Regions
								</div>
								<div className="stat-value">
									{regions?.length}
								</div>
							</div>
							<div className="stat">
								<div className="stat-title">
									Total Addresses
								</div>
								<div className="stat-value">
									{analytics?.reduce(
										(acc, curr) =>
											acc +
											curr.count,
										0
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Regions Table */}
			<div className="card bg-base-100">
				<div className="card-body">
					<div className="overflow-x-auto">
						<table className="table">
							<thead>
								<tr>
									<th>Title</th>
									<th>Delivery Price</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{regions?.map((region) => (
									<tr key={region._id}>
										<td>
											{
												region.title
											}
										</td>
										<td>
											{commaNumber(
												region.deliveryPrice
											)}
										</td>
										<td>
											<div className="flex gap-2">
												<button
													disabled={
														isLoading
													}
													className="btn btn-sm btn-info"
													onClick={() =>
														handleEdit(
															region
														)
													}>
													Edit
												</button>
												<button
													disabled={
														isLoading
													}
													className="btn btn-sm btn-error"
													onClick={() =>
														handleDelete(
															region._id
														)
													}>
													Delete
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* Add/Edit Modal */}
			<dialog
				className={`modal ${isAddModalOpen || isEditModalOpen ? "modal-open" : ""}`}>
				<div className="modal-box">
					<h3 className="font-bold text-lg mb-4">
						{selectedRegion ? "Edit Region" : "Add New Region"}
					</h3>
					<form onSubmit={handleSubmit}>
						<fieldset className="fieldset">
							<label className="label">
								<span className="label-text">
									Title
								</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full"
								value={formData.title}
								onChange={(e) =>
									setFormData({
										...formData,
										title: e.target
											.value,
									})
								}
								required
							/>
						</fieldset>
						<fieldset className="fieldset">
							<label className="label">
								<span className="label-text">
									Delivery Price
								</span>
							</label>
							<input
								type="number"
								step="0.01"
								className="input input-bordered w-full"
								value={formData.deliveryPrice}
								onChange={(e) =>
									setFormData({
										...formData,
										deliveryPrice:
											parseFloat(
												e
													.target
													.value
											),
									})
								}
								required
							/>
						</fieldset>
						<div className="modal-action">
							<button
								type="button"
								className="btn"
								onClick={() => {
									setIsAddModalOpen(false);
									setIsEditModalOpen(false);
									setFormData({
										title: "",
										deliveryPrice: 0,
									});
									setSelectedRegion(null);
								}}>
								Cancel
							</button>
							<button
								type="submit"
								disabled={isLoading}
								className="btn btn-primary">
								{selectedRegion
									? "Update"
									: "Create"}
							</button>
						</div>
					</form>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button
						onClick={() => {
							setIsAddModalOpen(false);
							setIsEditModalOpen(false);
							setFormData({
								title: "",
								deliveryPrice: 0,
							});
							setSelectedRegion(null);
						}}>
						close
					</button>
				</form>
			</dialog>
		</div>
	);
}
