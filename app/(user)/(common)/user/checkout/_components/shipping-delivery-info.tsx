"use client";

import { useUserAddress } from "@/hooks/useAddress";
import { handleError } from "@/lib/handleError";
import useCheckoutStore from "@/store/checkout-store";
import { FormattedAddress } from "@/types";
import commaNumber from "@/utils/comma-number";
import { useRef } from "react";
import { LuBadgeAlert } from "react-icons/lu";
import ShippingDeliveryAddressModal from "./shipping-delivery-address-modal";
function ShippingDeliveryInfo() {
	const modalRef = useRef<HTMLDialogElement>(null);
	const { address: selectedAddress, setAddress } = useCheckoutStore();
	const { isPending, isLoading, isError, data, error } = useUserAddress();

	if (isPending) {
		return (
			<>
				<h3 className="text-gray-500 text-xs mb-2">Loading...</h3>
				<div className="flex flex-col gap-4">
					{Array.from({ length: 3 }).map((_, i) => (
						<div
							key={i}
							className="flex items-center flex-1 py-2 px-4 border rounded-box">
							<div className="size-6 rounded-full skeleton">
								&nbsp;
							</div>
							<div className="flex-1">
								<p className="font-bold truncate max-w-[400px] mb-2 skeleton">
									&nbsp;
								</p>
								<p className="h-3 w-10 opacity-50 skeleton">
									&nbsp;
								</p>
							</div>
						</div>
					))}
				</div>
			</>
		);
	}

	if (isError) {
		return (
			<div role="alert" className="alert alert-outline">
				<LuBadgeAlert className="size-8 shrink-0" />
				<div>
					<h3 className="font-bold">Notice</h3>
					<span className="text-xs">{handleError(error)}</span>
				</div>
			</div>
		);
	}

	return (
		<>
			<h3 className="font-bold">Delivery shipping</h3>
			<fieldset className="fieldset gap-4">
				<legend className="sr-only">Address</legend>
				{data?.address.length === 0 ? (
					<div>
						<h3 className="font-bold">Notice</h3>
						<p>
							You have not entered an address for your
							location
						</p>
					</div>
				) : (
					data.address.map((address: FormattedAddress) => (
						<label
							key={address._id}
							className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
							<input
								name="address"
								type="radio"
								checked={
									selectedAddress ===
									address._id
								}
								onChange={() =>
									setAddress({
										address: address._id,
										deliveryFee:
											address.deliveryPrice,
									})
								}
								className="radio radio-xs checked:radio-primary"
							/>
							{/* <LuBox className="size-6" /> */}
							<div>
								<p className="font-bold break-words max-w-[400px]">
									({address.title}){" "}
									{address.location}{" "}
									{!!address.landmark &&
										` -- ${address.landmark}`}
								</p>
								<p className="text-xs opacity-50">
									Delivery fee:{" "}
									{address.deliveryPrice > 0
										? commaNumber(
												address.deliveryPrice
											)
										: "Free"}
								</p>
							</div>
						</label>
					))
				)}
			</fieldset>
			<button
				className="btn btn-neutral btn-block"
				onClick={() => modalRef.current?.showModal()}>
				Add new address
			</button>
			<ShippingDeliveryAddressModal modalRef={modalRef} />
			{isLoading && <p>Loading...</p>}
		</>
	);
}

export default ShippingDeliveryInfo;
