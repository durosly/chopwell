"use client";

import { getCategorization, updateFoodCategory } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import { FoodData } from "@/models/food";
import {
	adminUpdateFoodCategorySchema,
	AdminUpdateFoodCategoryType,
} from "@/schema/admin-update-food-category-schema";
import { ToastRef } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CategoryTypeFormProps {
	food: FoodData & { _id: string };
}

export default function CategoryTypeForm({ food }: CategoryTypeFormProps) {
	const queryClient = useQueryClient();
	const toastRef = useRef<ToastRef>(undefined);
	const [selectedCategory, setSelectedCategory] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty },
		watch,
	} = useForm<AdminUpdateFoodCategoryType>({
		resolver: zodResolver(adminUpdateFoodCategorySchema),
		defaultValues: {
			_categoryId: food._categoryId.toString(),
			_subCategoryId: food._subCategoryId.toString(),
			type: food.type,
			timeChoice: food.timeChoice,
		},
	});

	const mutation = useMutation({
		mutationFn: (data: AdminUpdateFoodCategoryType) =>
			updateFoodCategory(food._id, data),
		onMutate: () => {
			toastRef.current = toast.loading("Updating category & type...", {
				duration: Infinity,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["food", food._id] });
			toast.success("Category & type updated successfully", {
				id: toastRef.current,
			});
		},
		onError: (error) => {
			toast.error(handleError(error), {
				id: toastRef.current,
			});
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef.current);
			}, 5000);
		},
	});

	const onSubmit = (data: AdminUpdateFoodCategoryType) => {
		mutation.mutate(data);
	};

	const _categoryId = watch("_categoryId");
	useEffect(() => {
		setSelectedCategory(_categoryId);
	}, [_categoryId]);

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
		<div className="card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Category & Type</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<fieldset className="fieldset">
						<label className="label">
							<span className="label-text">Category</span>
						</label>
						<select
							className="select select-bordered"
							{...register("_categoryId", {
								required: "Category is required",
							})}>
							<option value="">Select a category</option>
							{categories.map(
								(category: {
									_id: string;
									name: string;
								}) => (
									<option
										key={category._id}
										value={
											category._id
										}>
										{category.name}
									</option>
								)
							)}
						</select>
						{errors._categoryId && (
							<span className="text-error text-sm">
								{errors._categoryId.message}
							</span>
						)}
					</fieldset>

					<fieldset className="fieldset">
						<label className="label">
							<span className="label-text">
								Subcategory
							</span>
						</label>
						<select
							className="select select-bordered"
							{...register("_subCategoryId")}>
							<option value="">
								Select a subcategory
							</option>
							{/* Subcategories will be populated from API */}
							{subcategories
								.filter(
									(sub: {
										_categoryId: string;
									}) =>
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
											{
												subcategory.name
											}
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
							<span className="label-text">Type</span>
						</label>
						<select
							className="select select-bordered"
							{...register("type", {
								required: "Type is required",
							})}>
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
						<label className="label">
							<span className="label-text">
								Time Choice
							</span>
						</label>
						<select
							className="select select-bordered"
							{...register("timeChoice", {
								required: "Time choice is required",
							})}>
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

					<div className="card-actions justify-end">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={!isDirty || isSubmitting}>
							{isSubmitting
								? "Updating..."
								: "Update Category & Type"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
