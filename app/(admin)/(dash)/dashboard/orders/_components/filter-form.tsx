"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LuFilter, LuSearch } from "react-icons/lu";

const statusOptions = [
	{ value: "all", label: "All Statuses", icon: null },
	{ value: "pending", label: "Pending" },
	{
		value: "preparing",
		label: "Preparing",
	},
	{ value: "delivering", label: "Delivering" },
	{ value: "successful", label: "Successful" },
	{ value: "cancelled", label: "Cancel" },
];

function FilterForm() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("all");
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");

	useEffect(() => {
		// Load initial values from URL search params
		setSearch(searchParams.get("search") || "");
		setStatus(searchParams.get("status") || "all");
		setDateFrom(searchParams.get("dateFrom") || "");
		setDateTo(searchParams.get("dateTo") || "");
	}, [searchParams]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Check if any field has been changed from its default state
		const hasChanges =
			search !== "" || status !== "all" || dateFrom !== "" || dateTo !== "";

		if (!hasChanges) {
			return; // Prevent submission if no changes are made
		}

		const params = new URLSearchParams();
		if (search) params.set("search", search);
		if (status !== "all") params.set("status", status);
		if (dateFrom) params.set("dateFrom", dateFrom);
		if (dateTo) params.set("dateTo", dateTo);

		router.push(`/dashboard/orders?${params.toString()}`);
	};

	const handleClear = () => {
		setSearch("");
		setStatus("all");
		setDateFrom("");
		setDateTo("");
		router.push("/dashboard/orders");
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col md:flex-row gap-4 mb-4">
				<div className="w-full md:w-96">
					<label className="input input-bordered w-full flex items-center gap-2">
						<LuSearch className="size-4 opacity-50" />
						<input
							type="search"
							placeholder="Search orders..."
							className="grow"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</label>
				</div>

				<div className="w-full md:w-48">
					<select
						className="select select-bordered w-full"
						value={status}
						onChange={(e) => setStatus(e.target.value)}>
						{statusOptions.map((option) => (
							<option
								key={option.value}
								value={option.value}
								className="flex items-center gap-2">
								{option.label}
							</option>
						))}
					</select>
				</div>

				{/* Date Range Filter */}
				<div className="flex flex-col md:flex-row gap-4">
					<div className="w-full md:w-48">
						<label className="input input-bordered w-full flex items-center gap-2">
							<input
								type="date"
								className="grow"
								value={dateFrom}
								onChange={(e) =>
									setDateFrom(e.target.value)
								}
							/>
						</label>
					</div>
					<div className="w-full md:w-48">
						<label className="input input-bordered w-full flex items-center gap-2">
							<input
								type="date"
								className="grow"
								value={dateTo}
								onChange={(e) =>
									setDateTo(e.target.value)
								}
							/>
						</label>
					</div>
				</div>

				<button type="submit" className="btn btn-primary">
					<LuFilter className="size-4" />
					<span>Filter</span>
				</button>
			</form>

			<button onClick={handleClear} className="btn">
				Clear filter
			</button>
		</>
	);
}

export default FilterForm;
