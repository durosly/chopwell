"use client";

import { getRegions, updateUserAddress } from "@/api";
import { handleError } from "@/lib/handleError";
import { FormattedAddress } from "@/types";
import addAddressSchema, { AddAddressType } from "@/types/add-address";
import commaNumber from "@/utils/comma-number";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function EditAddressForm({ existingAddress }: { existingAddress: FormattedAddress }) {
	const router = useRouter();
	const toastRef = useRef<string | number | undefined>(undefined);
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["address-region"],
		queryFn: () => getRegions(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
	} = useForm<AddAddressType>({
		resolver: zodResolver(addAddressSchema),
		defaultValues: {
			address: existingAddress.location,
			region: existingAddress.region,
			landmark: existingAddress.landmark,
		},
	});
	const { mutate, isPending: isUpdatingAddress } = useMutation({
		onMutate: () => {
			toastRef.current = toast.loading("Updating address", {
				description: "This may take a while",
				duration: Infinity,
			});
		},
		mutationFn: (data: AddAddressType) => updateUserAddress(data, existingAddress._id),
		onError: (error) => {
			const message = handleError(error);
			toast.error("Error occured", {
				description: message,
				id: toastRef.current,
			});
		},
		onSuccess: async () => {
			toast.success("Success", {
				description: "Address Updated",
				id: toastRef.current,
			});
			reset();
			router.back();
		},
		onSettled: () => {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
		},
	});
	function onSubmit(data: AddAddressType) {
		mutate(data);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="">
			<fieldset className="fieldset">
				<div className="label">
					<span className="label-text-alt">Address</span>
				</div>
				<input
					type="text"
					disabled={isUpdatingAddress}
					{...register("address")}
					placeholder="Enter your address"
					className="input input-bordered w-full"
				/>
			</fieldset>

			{isPending ? (
				<div className="flex flex-col gap-2">
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="h-8 skeleton rounded-box">
							&nbsp;
						</div>
					))}
				</div>
			) : isError ? (
				<div className="alert alert-error alert-soft">
					{handleError(error)}
				</div>
			) : !!data?.regions && data.regions.length > 0 ? (
				<fieldset className="fieldset">
					<div className="label">
						<span className="label-text-alt">Region</span>
					</div>
					<select
						className="select w-full"
						disabled={isUpdatingAddress}
						{...register("region")}
						name="region"
						id="region">
						<option value="" disabled>
							-- select region --
						</option>
						{data.regions.map(
							(region: {
								_id: string;
								title: string;
								deliveryPrice: number;
							}) => (
								<option
									key={region._id}
									value={region._id}>
									{region.title} -{" "}
									{region.deliveryPrice > 0
										? commaNumber(
												region.deliveryPrice
											)
										: "Free"}
								</option>
							)
						)}
					</select>
				</fieldset>
			) : (
				<div className="alert alert-error alert-soft">
					No region found. Please, contact admin.
				</div>
			)}

			<fieldset className="fieldset">
				<div className="label">
					<span className="label-text-alt">Landmark</span>
				</div>
				<input
					type="text"
					placeholder="Landmark (if any)"
					disabled={isUpdatingAddress}
					{...register("landmark")}
					className="input input-bordered w-full"
				/>
			</fieldset>
			{Object.keys(errors).length > 0 && (
				<div className="alert alert-error alert-soft">
					<ul className="list list-disc list-inside text-xs">
						{Object.keys(errors).map((errorKey, i: number) => (
							<li key={`${errorKey}-${i}`}>
								{
									errors[
										errorKey as keyof typeof errors
									]?.message
								}
							</li>
						))}
					</ul>
				</div>
			)}

			<div className="mt-2">
				<button
					disabled={isUpdatingAddress || !isDirty}
					className="btn btn-primary btn-block">
					Save Update
				</button>
			</div>
		</form>
	);
}

export default EditAddressForm;
