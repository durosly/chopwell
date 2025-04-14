"use client";
import IconArrowLeft from "@/icons/arrow-left";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import TwoThumbsDraggableTrack from "./range-2";
import commaNumber from "@/utils/comma-number";
type MealTime = "breakfast" | "lunch" | "dinner" | null;

function FilterBy() {
	const [isOpen, setIsOpen] = useState(false);
	const searchParams = useSearchParams();

	// State for all filter options
	const [priceRange, setPriceRange] = useState<[number, number]>([1025, 7500]);
	const [mealTime, setMealTime] = useState<MealTime>(null);

	// Initialize states from URL params
	useEffect(() => {
		const minPrice = searchParams.get("minPrice");
		const maxPrice = searchParams.get("maxPrice");
		const meal = searchParams.get("mealTime") as MealTime;

		if (minPrice && maxPrice) {
			setPriceRange([Number(minPrice), Number(maxPrice)]);
		}
		if (meal) {
			setMealTime(meal);
		}
	}, [searchParams]);

	// Get current filter text
	const getFilterText = () => {
		const minPrice = searchParams.get("minPrice");
		const maxPrice = searchParams.get("maxPrice");
		const meal = searchParams.get("mealTime") as MealTime;

		const filters = [];

		// Add price range if not default
		if (minPrice && maxPrice) {
			filters.push(`${commaNumber(minPrice)} - ${commaNumber(maxPrice)}`);
		}

		// Add meal time if selected
		if (meal) {
			filters.push(meal.charAt(0).toUpperCase() + meal.slice(1));
		}

		return filters.length > 0 ? filters.join(" • ") : "Price";
	};

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

	const updateUrlParams = () => {
		const params = new URLSearchParams(searchParams.toString());

		// Update price range params
		if (priceRange[0] !== 1025 || priceRange[1] !== 7500) {
			params.set("minPrice", priceRange[0].toString());
			params.set("maxPrice", priceRange[1].toString());
		} else {
			params.delete("minPrice");
			params.delete("maxPrice");
		}

		// Update meal time param
		if (mealTime) {
			params.set("mealTime", mealTime);
		} else {
			params.delete("mealTime");
		}

		window.history.pushState(null, "", `?${params.toString()}`);
	};
	const handleApply = () => {
		updateUrlParams();
		setIsOpen(false);
	};

	const handleClearAll = () => {
		setPriceRange([1025, 7500]);
		setMealTime(null);
		const params = new URLSearchParams(searchParams.toString());
		params.delete("minPrice");
		params.delete("maxPrice");
		params.delete("mealTime");
		window.history.pushState(null, "", `?${params.toString()}`);
	};

	return (
		<>
			<div className="flex items-center gap-5">
				<span className="text-base-content">Filter by:</span>
				<button
					onClick={() => setIsOpen(true)}
					className="btn btn-ghost btn-sm gap-1 text-primary">
					{getFilterText()}{" "}
					<IconArrowLeft className="w-4 h-4 -rotate-90" />
				</button>
			</div>
			{/* filter modal */}
			{isOpen && (
				<dialog className="modal modal-open modal-bottom sm:modal-middle">
					<div className="modal-box max-w-2xl">
						<button
							onClick={() => setIsOpen(false)}
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>

						<h3 className="font-bold text-lg text-center mb-3">
							Filter Options
						</h3>
						<hr className="border-base-200" />
						<div className="space-y-6 mt-6">
							<div className="form-control">
								<label className="label">
									<span className="label-text font-medium">
										Price Range
									</span>
								</label>
								<TwoThumbsDraggableTrack
									rtl={false}
									values={priceRange}
									onChange={setPriceRange}
								/>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text font-medium">
										Meal Time
									</span>
								</label>
								<div className="flex gap-2">
									<input
										type="radio"
										name="radio-10"
										className="btn btn-sm checked:bg-primary"
										aria-label="Breakfast"
										checked={
											mealTime ===
											"breakfast"
										}
										onChange={() =>
											setMealTime(
												"breakfast"
											)
										}
									/>
									<input
										type="radio"
										name="radio-10"
										className="btn btn-sm checked:bg-primary"
										aria-label="Lunch"
										checked={
											mealTime ===
											"lunch"
										}
										onChange={() =>
											setMealTime(
												"lunch"
											)
										}
									/>
									<input
										type="radio"
										name="radio-10"
										className="btn btn-sm checked:bg-primary"
										aria-label="Dinner"
										checked={
											mealTime ===
											"dinner"
										}
										onChange={() =>
											setMealTime(
												"dinner"
											)
										}
									/>
								</div>
							</div>
						</div>
						<hr className="my-6 border-base-200" />
						<div className="flex gap-4">
							<button
								onClick={handleClearAll}
								className="btn btn-outline flex-1">
								Clear All
							</button>
							<button
								onClick={handleApply}
								className="btn btn-primary flex-1">
								Apply Filters
							</button>
						</div>
						<p className="py-4 text-xs mt-6 text-base-content/60 text-center">
							Press ESC key or click outside to close
						</p>
					</div>
					<form
						onClick={() => setIsOpen(false)}
						method="dialog"
						className="modal-backdrop">
						<button>close</button>
					</form>
				</dialog>
			)}
		</>
	);
}

export default FilterBy;
