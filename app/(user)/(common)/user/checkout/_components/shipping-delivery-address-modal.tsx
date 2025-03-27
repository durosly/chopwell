"use client";

import { addNewAddress, getRegions } from "@/api";
import { handleError } from "@/lib/handleError";
import addAddressSchema, { AddAddressType } from "@/types/add-address";
import commaNumber from "@/utils/comma-number";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuX } from "react-icons/lu";
import { toast } from "sonner";

function ShippingDeliveryAddressModal({ modalRef }: { modalRef: RefObject<HTMLDialogElement | null> }) {
	const queryClient = useQueryClient();
	const { isPending, isError, data, error } = useQuery({ queryKey: ["address-region"], queryFn: () => getRegions() });

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddAddressType>({ resolver: zodResolver(addAddressSchema), defaultValues: { address: "", region: "", landmark: "" } });
	const { mutate, isPending: isAddNewAddress } = useMutation({
		mutationFn: (data: AddAddressType) => addNewAddress(data),
		onError: (error) => {
			const message = handleError(error);
			toast.error("Error occured", { description: message });
		},
		onSuccess: async () => {
			modalRef.current?.close();
			toast.success("Success", { description: "Address added" });
			reset();
			await queryClient.invalidateQueries({ queryKey: ["user-address"] });
		},
	});
	function onSubmit(data: AddAddressType) {
		mutate(data);
	}
	return (
		<dialog ref={modalRef} id="my_modal" className="modal">
			<div className="modal-box">
				<button
					type="button"
					className="btn btn-ghost btn-sm btn-circle absolute right-2 top-2"
					onClick={() => modalRef.current && modalRef.current.close()}>
					<LuX className="size-5" />
				</button>
				<h3 className="font-bold text-lg">Add New Address</h3>
				{isPending ? (
					<div className="flex flex-col gap-2">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="h-8 skeleton rounded-box">
								&nbsp;
							</div>
						))}
					</div>
				) : isError ? (
					<div className="alert alert-error alert-soft">{handleError(error)}</div>
				) : !!data?.regions && data.regions.length > 0 ? (
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
						<input
							type="text"
							disabled={isAddNewAddress}
							{...register("address")}
							placeholder="Enter your address"
							className="input input-bordered w-full"
						/>
						<select className="select w-full" disabled={isAddNewAddress} {...register("region")} name="region" id="region" defaultValue={""}>
							<option value="" disabled>
								-- select region --
							</option>
							{data.regions.map((region: { _id: string; title: string; deliveryPrice: number }) => (
								<option key={region._id} value={region._id}>
									{region.title} - {region.deliveryPrice > 0 ? commaNumber(region.deliveryPrice) : "Free"}
								</option>
							))}
						</select>
						<input
							type="text"
							placeholder="Landmark (if any)"
							disabled={isAddNewAddress}
							{...register("landmark")}
							className="input input-bordered w-full"
						/>
						{Object.keys(errors).length > 0 && (
							<div className="alert alert-error alert-soft">
								<ul className="list list-disc list-inside text-xs">
									{Object.keys(errors).map((errorKey, i: number) => (
										<li key={`${errorKey}-${i}`}>{errors[errorKey as keyof typeof errors]?.message}</li>
									))}
								</ul>
							</div>
						)}
						<div className="modal-action">
							<button disabled={isAddNewAddress} type="submit" className="btn btn-primary">
								{isAddNewAddress ? (
									<>
										<span className="loading loading-spinner"></span>
										<span>Saving...</span>
									</>
								) : (
									"Save"
								)}
							</button>
							<button disabled={isAddNewAddress} type="button" className="btn" onClick={() => modalRef.current?.close()}>
								Cancel
							</button>
						</div>
					</form>
				) : (
					<div className="alert alert-error alert-soft">No region found. Please, contact admin.</div>
				)}
			</div>
		</dialog>
	);
}

export default ShippingDeliveryAddressModal;
