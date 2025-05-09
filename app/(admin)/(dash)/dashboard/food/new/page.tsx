"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { createFood, getCategorization } from "@/api/admin";
import { useState, useEffect, useRef } from "react";
import { handleError } from "@/lib/handleError";
import { foodFormSchema } from "@/schema/admin-create-food-schema";
import { FoodFormData } from "@/schema/admin-create-food-schema";
import { useRouter } from "nextjs-toploader/app";

function AddNewFoodPage() {
	const router = useRouter();
	const toastRef = useRef<string | number | undefined>(undefined);
	const queryClient = useQueryClient();
	const [selectedCategory, setSelectedCategory] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		reset,
	} = useForm<FoodFormData>({
		resolver: zodResolver(foodFormSchema),
	});

	const _categoryId = watch("_categoryId");
	useEffect(() => {
		setSelectedCategory(_categoryId);
	}, [_categoryId]);

	const createFoodMutation = useMutation({
		mutationFn: async (data: FoodFormData) => createFood(data),
		onMutate: () => {
			toastRef.current = toast.loading("Creating food item...");
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["foods"] });
			toast.success("Food item created successfully", {
				id: toastRef.current,
			});
			reset();
			router.push(`/dashboard/food/${data.foodId}`);
		},
		onError: (error) => {
			toast.error(handleError(error), {
				id: toastRef.current,
			});
		},
	});

	const onSubmit = (data: FoodFormData) => {
		createFoodMutation.mutate(data);
	};

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
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Add New Food Item</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
				<fieldset className="fieldset">
					<label className="label">
						<span className="label-text">Name</span>
					</label>
					<input
						type="text"
						placeholder="Enter food name"
						className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
						{...register("name")}
					/>
					{errors.name && (
						<span className="text-error text-sm">
							{errors.name.message}
						</span>
					)}
				</fieldset>

				<fieldset className="fieldset">
					<label className="label">
						<span className="label-text">Category</span>
					</label>
					<select
						className={`select select-bordered w-full ${errors._categoryId ? "select-error" : ""}`}
						{...register("_categoryId")}>
						<option value="">- Select a category -</option>
						{categories.map(
							(category: {
								_id: string;
								name: string;
							}) => (
								<option
									key={category._id}
									value={category._id}>
									{category.name}
								</option>
							)
						)}
						{/* Categories will be populated dynamically */}
					</select>
					{errors._categoryId && (
						<span className="text-error text-sm">
							{errors._categoryId.message}
						</span>
					)}
				</fieldset>

				<fieldset className="fieldset">
					<label className="label">
						<span className="label-text">Sub-category</span>
					</label>
					<select
						className={`select select-bordered w-full ${errors._subCategoryId ? "select-error" : ""}`}
						{...register("_subCategoryId")}>
						<option value="">- Select a sub-category -</option>
						{/* Sub-categories will be populated dynamically */}
						{subcategories
							.filter(
								(sub: { _categoryId: string }) =>
									!selectedCategory ||
									sub._categoryId ===
										selectedCategory
							)
							.map(
								(subcategory: {
									_id: string;
									name: string;
								}) => (
									<option
										key={
											subcategory._id
										}
										value={
											subcategory._id
										}>
										{subcategory.name}
									</option>
								)
							)}
					</select>
					{errors._subCategoryId && (
						<span className="text-error text-sm">
							{errors._subCategoryId.message}
						</span>
					)}
				</fieldset>

				<fieldset className="fieldset">
					<label className="label">
						<span className="label-text">Price</span>
					</label>
					<input
						type="number"
						placeholder="Enter price"
						className={`input input-bordered w-full ${errors.price ? "input-error" : ""}`}
						{...register("price", { valueAsNumber: true })}
					/>
					{errors.price && (
						<span className="text-error text-sm">
							{errors.price.message}
						</span>
					)}
				</fieldset>

				<fieldset className="fieldset">
					<label className="label">
						<span className="label-text">
							Short Description
						</span>
					</label>
					<textarea
						placeholder="Enter short description"
						className={`textarea textarea-bordered w-full ${errors.short_desc ? "textarea-error" : ""}`}
						{...register("short_desc")}
					/>
					{errors.short_desc && (
						<span className="text-error text-sm">
							{errors.short_desc.message}
						</span>
					)}
				</fieldset>

				<fieldset className="fieldset">
					<label className="label">
						<span className="label-text">Time Choice</span>
					</label>
					<select
						className={`select select-bordered w-full ${errors.timeChoice ? "select-error" : ""}`}
						{...register("timeChoice")}>
						<option value="">- Select a time choice -</option>
						<option value="breakfast">Breakfast</option>
						<option value="lunch">Lunch</option>
						<option value="dinner">Dinner</option>
					</select>
					{errors.timeChoice && (
						<span className="text-error text-sm">
							{errors.timeChoice.message}
						</span>
					)}
				</fieldset>

				<fieldset className="fieldset">
					<label className="label">
						<span className="label-text">Type</span>
					</label>
					<select
						className={`select select-bordered w-full ${errors.type ? "select-error" : ""}`}
						{...register("type")}>
						<option value="">- Select a type -</option>
						<option value="food">Food</option>
						<option value="drink">Drink</option>
						<option value="combo">Combo</option>
					</select>
					{errors.type && (
						<span className="text-error text-sm">
							{errors.type.message}
						</span>
					)}
				</fieldset>

				<fieldset className="fieldset">
					<button
						type="submit"
						className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
						disabled={isSubmitting}>
						{isSubmitting ? "Creating..." : "Create Food Item"}
					</button>
				</fieldset>
			</form>
		</div>
	);
}

export default AddNewFoodPage;
