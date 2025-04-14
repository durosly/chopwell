"use client";
import IconArrowLeft from "@/icons/arrow-left";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function SortBy() {
	const [isOpen, setIsOpen] = useState(false);
	const searchParams = useSearchParams();
	const sortBy = searchParams.get("sortBy");
	const [sortByValue, setSortByValue] = useState(sortBy || "relevance");

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			window.addEventListener("keydown", handleEsc);
		}

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [isOpen]);

	const handleSortBy = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("sortBy", value);
		window.history.pushState(null, "", `?${params.toString()}`);
	};

	return (
		<>
			<div className="flex items-center gap-5">
				<span className="text-base-content/70">Sort by:</span>
				<span
					onClick={() => setIsOpen(true)}
					className="flex items-center gap-1 text-primary hover:text-primary-focus cursor-pointer transition-colors">
					{!sortBy || sortBy === "relevance"
						? "Most Relevant"
						: sortBy === "price-asc"
							? "Price: Low to High"
							: sortBy === "price-desc"
								? "Price: High to Low"
								: sortBy === "rating"
									? "Highest Rated"
									: "Most Relevant"}
					<IconArrowLeft className="w-5 h-5 -rotate-90" />
				</span>
			</div>

			{/* Relevance modal */}
			{isOpen && (
				<dialog className="modal modal-open modal-bottom sm:modal-middle">
					<div className="modal-box">
						<button
							onClick={() => setIsOpen(false)}
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>

						<h3 className="font-bold text-lg text-center mb-4">
							Sort By
						</h3>
						<hr className="mb-4" />
						<div>
							<div className="form-control">
								<label className="label cursor-pointer hover:bg-base-200 rounded-lg p-3 transition-colors">
									<div className="flex items-center gap-3">
										<div className="relative">
											<input
												type="radio"
												name="sort-radio"
												className="radio radio-primary w-5 h-5"
												checked={
													!sortByValue ||
													sortByValue ===
														"relevance"
												}
												onChange={() =>
													setSortByValue(
														"relevance"
													)
												}
											/>
											<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
												{(!sortByValue ||
													sortByValue ===
														"relevance") && (
													<div className="w-2 h-2 rounded-full bg-primary"></div>
												)}
											</div>
										</div>
										<span className="label-text font-medium">
											Relevance
										</span>
									</div>
								</label>
							</div>
							<div className="form-control">
								<label className="label cursor-pointer hover:bg-base-200 rounded-lg p-3 transition-colors">
									<div className="flex items-center gap-3">
										<div className="relative">
											<input
												type="radio"
												name="sort-radio"
												className="radio radio-primary w-5 h-5"
												checked={
													sortByValue ===
													"price-asc"
												}
												onChange={() =>
													setSortByValue(
														"price-asc"
													)
												}
											/>
											<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
												{sortBy ===
													"price-asc" && (
													<div className="w-2 h-2 rounded-full bg-primary"></div>
												)}
											</div>
										</div>
										<span className="label-text font-medium">
											Price: Low
											to High
										</span>
									</div>
								</label>
							</div>
							<div className="form-control">
								<label className="label cursor-pointer hover:bg-base-200 rounded-lg p-3 transition-colors">
									<div className="flex items-center gap-3">
										<div className="relative">
											<input
												type="radio"
												name="sort-radio"
												className="radio radio-primary w-5 h-5"
												checked={
													sortByValue ===
													"price-desc"
												}
												onChange={() =>
													setSortByValue(
														"price-desc"
													)
												}
											/>
											<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
												{sortByValue ===
													"price-desc" && (
													<div className="w-2 h-2 rounded-full bg-primary"></div>
												)}
											</div>
										</div>
										<span className="label-text font-medium">
											Price: High
											to Low
										</span>
									</div>
								</label>
							</div>
							<div className="form-control">
								<label className="label cursor-pointer hover:bg-base-200 rounded-lg p-3 transition-colors">
									<div className="flex items-center gap-3">
										<div className="relative">
											<input
												type="radio"
												name="sort-radio"
												className="radio radio-primary w-5 h-5"
												checked={
													sortByValue ===
													"rating"
												}
												onChange={() =>
													setSortByValue(
														"rating"
													)
												}
											/>
											<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
												{sortByValue ===
													"rating" && (
													<div className="w-2 h-2 rounded-full bg-primary"></div>
												)}
											</div>
										</div>
										<span className="label-text font-medium">
											Rating
										</span>
									</div>
								</label>
							</div>

							<button
								className="btn btn-primary w-full"
								onClick={() => {
									handleSortBy(sortByValue);
									setIsOpen(false);
								}}>
								Apply
							</button>
						</div>
						<p className="py-4 text-xs text-base-content/60 text-center">
							* Press ESC key or click outside to close
						</p>
					</div>
					<form method="dialog" className="modal-backdrop">
						<button onClick={() => setIsOpen(false)}>
							close
						</button>
					</form>
				</dialog>
			)}
		</>
	);
}

export default SortBy;
