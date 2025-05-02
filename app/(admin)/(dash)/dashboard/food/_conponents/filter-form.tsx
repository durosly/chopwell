"use client";
import { LuFilter } from "react-icons/lu";

import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCategorization } from "@/api/admin";
import { handleError } from "@/lib/handleError";

function FilterForm() {
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedSubcategory, setSelectedSubcategory] = useState("");

	useEffect(() => {
		const search = searchParams.get("search");
		const category = searchParams.get("category");
		const subcategory = searchParams.get("subcategory");
		setSearchQuery(search || "");
		setSelectedCategory(category || "");
		setSelectedSubcategory(subcategory || "");
	}, [searchParams]);

	function clearFilter() {
		setSearchQuery("");
		setSelectedCategory("");
		setSelectedSubcategory("");

		// remove params from url
		const params = new URLSearchParams(searchParams.toString());
		params.delete("search");
		params.delete("category");
		params.delete("subcategory");
		window.history.pushState(null, "", `?${params.toString()}`);
	}

	const {
		data: categorization,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryFn: () => getCategorization(),
		queryKey: ["categorization"],
	});

	const categories = categorization?.categories;
	const subcategories = categorization?.subcategories;

	if (isLoading) return <div>Loading...</div>;
	if (isError)
		return <div className="alert alert-error alert-soft">{handleError(error)}</div>;

	return (
		<Form action="/dashboard/food" className="card bg-base-100 p-4 mb-6">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<label className="input w-full">
					<LuSearch className=" size-5" />
					<input
						type="search"
						className="grow"
						placeholder="Search foods..."
						name="search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</label>

				<select
					className="select select-bordered w-full"
					name="category"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}>
					<option value="">All Categories</option>
					{categories.map(
						(category: { _id: string; name: string }) => (
							<option
								key={category._id}
								value={category._id}>
								{category.name}
							</option>
						)
					)}
				</select>
				<select
					className="select select-bordered w-full"
					name="subcategory"
					value={selectedSubcategory}
					onChange={(e) => setSelectedSubcategory(e.target.value)}>
					<option value="">All Subcategories</option>
					{subcategories
						.filter(
							(sub: { _categoryId: string }) =>
								!selectedCategory ||
								sub._categoryId === selectedCategory
						)
						.map(
							(subcategory: {
								_id: string;
								name: string;
							}) => (
								<option
									key={subcategory._id}
									value={subcategory._id}>
									{subcategory.name}
								</option>
							)
						)}
				</select>
				<button className="btn btn-primary">Filter</button>

				<button
					className="btn btn-ghost "
					type="button"
					onClick={clearFilter}>
					<LuFilter className="size-5" />
					Clear Filters
				</button>
			</div>
		</Form>
	);
}

export default FilterForm;
