"use client";

import { updateFoodAvailability } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import { FoodData } from "@/models/food";
import {
	AdminUpdateFoodAvailabilitySchema,
	AdminUpdateFoodAvailabilityType,
} from "@/schema/admin-update-food-availability-schema";
import { ToastRef } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AvailabilityFormProps {
	food: FoodData & { _id: string };
}

export default function AvailabilityForm({ food }: AvailabilityFormProps) {
	const queryClient = useQueryClient();
	const toastRef = useRef<ToastRef>(undefined);
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isSubmitting },
	} = useForm<AdminUpdateFoodAvailabilityType>({
		resolver: zodResolver(AdminUpdateFoodAvailabilitySchema),
		defaultValues: {
			available: food.available,
			preparation_time: food.preparation_time,
		},
	});

	const mutation = useMutation({
		mutationFn: (data: AdminUpdateFoodAvailabilityType) =>
			updateFoodAvailability(food._id, data),
		onMutate: () => {
			toastRef.current = toast.loading(
				"Updating availability/preparation time...",
				{ duration: Infinity }
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["food", food._id] });
			toast.success("Availability/preparation time updated successfully", {
				id: toastRef.current,
			});
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, { id: toastRef.current });
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef.current);
			}, 5000);
		},
	});

	const onSubmit = (data: AdminUpdateFoodAvailabilityType) => {
		mutation.mutate(data);
	};

	return (
		<div className="card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Availability</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<fieldset className="fieldset">
						<label className="label cursor-pointer">
							<span className="label-text">
								Available
							</span>
							<input
								type="checkbox"
								className="toggle toggle-primary"
								{...register("available")}
							/>
						</label>
						{errors.available && (
							<span className="text-error text-sm">
								{errors.available.message}
							</span>
						)}
					</fieldset>

					<fieldset className="fieldset">
						<label className="label">
							<span className="label-text">
								Preparation Time (minutes)
							</span>
						</label>
						<input
							type="number"
							className="input input-bordered"
							{...register("preparation_time", {
								required: "Preparation time is required",
								min: {
									value: 1,
									message: "Preparation time must be at least 1 minute",
								},
							})}
						/>
						{errors.preparation_time && (
							<span className="text-error text-sm">
								{errors.preparation_time.message}
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
								: "Update Availability"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
