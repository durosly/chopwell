"use client";

import { updateFoodBaseInfo } from "@/api/admin";
import { FoodData } from "@/models/food";
import {
	adminUpdateFoodBaseInfoSchema,
	AdminUpdateFoodBaseInfoSchema,
} from "@/schema/admin-update-food-base-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { ToastRef } from "@/types";
import { toast } from "sonner";
import { handleError } from "@/lib/handleError";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface BasicInfoFormProps {
	food: FoodData & { _id: string };
}

export default function BasicInfoForm({ food }: BasicInfoFormProps) {
	const toastRef = useRef<ToastRef>(undefined);
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isDirty },
	} = useForm<AdminUpdateFoodBaseInfoSchema>({
		resolver: zodResolver(adminUpdateFoodBaseInfoSchema),
		defaultValues: {
			name: food.name,
			short_desc: food.short_desc,
			full_desc: food.full_desc,
			price: food.price,
			number_of_item: food.number_of_item,
			unit: food.unit,
		},
	});

	const mutation = useMutation({
		mutationFn: (data: AdminUpdateFoodBaseInfoSchema) =>
			updateFoodBaseInfo(food._id, data),
		onMutate: () => {
			toastRef.current = toast.loading("Updating...", { duration: Infinity });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["food", food._id] });

			toast.success("Food updated successfully", {
				id: toastRef.current,
			});
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, {
				id: toastRef.current,
			});
		},

		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef.current);
			}, 5000);
		},
	});

	const onSubmit = (data: AdminUpdateFoodBaseInfoSchema) => {
		mutation.mutate(data);
	};

	return (
		<div className="card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Basic Information</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<fieldset className="fieldset">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							className="input input-bordered"
							{...register("name", {
								required: "Name is required",
							})}
						/>
						{errors.name && (
							<span className="text-error text-sm">
								{errors.name.message}
							</span>
						)}
					</fieldset>

					<fieldset className="fieldset">
						<label className="label">
							<span className="label-text">
								Short Description
							</span>
						</label>
						<input
							type="text"
							className="input input-bordered"
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
							<span className="label-text">
								Full Description
							</span>
						</label>
						<SimpleMDE
							value={watch("full_desc")}
							onChange={(value) =>
								setValue("full_desc", value, {
									shouldValidate: true,
									shouldDirty: true,
								})
							}
						/>
						{errors.full_desc && (
							<span className="text-error text-sm">
								{errors.full_desc.message}
							</span>
						)}
					</fieldset>

					<div className="grid grid-cols-2 gap-4">
						<fieldset className="fieldset">
							<label className="label">
								<span className="label-text">
									Price
								</span>
							</label>
							<input
								type="number"
								className="input input-bordered"
								{...register("price", {
									required: "Price is required",
									min: {
										value: 0,
										message: "Price must be positive",
									},
								})}
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
									Number of Items
								</span>
							</label>
							<input
								type="number"
								className="input input-bordered"
								{...register("number_of_item", {
									min: {
										value: 1,
										message: "Number must be positive",
									},
								})}
							/>
							{errors.number_of_item && (
								<span className="text-error text-sm">
									{
										errors
											.number_of_item
											.message
									}
								</span>
							)}
						</fieldset>
					</div>

					<fieldset className="fieldset">
						<label className="label">
							<span className="label-text">Unit</span>
						</label>
						<input
							type="text"
							className="input input-bordered"
							{...register("unit")}
						/>
						<label className="label">
							<span className="label-text-alt">
								* Enter measuring unit in singular
							</span>
						</label>
						{errors.unit && (
							<span className="text-error text-sm">
								{errors.unit.message}
							</span>
						)}
					</fieldset>

					<div className="card-actions justify-end">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={mutation.isPending || !isDirty}>
							{mutation.isPending
								? "Updating..."
								: "Update Basic Info"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
