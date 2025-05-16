"use client";

import { useMakeAddressDefault, useUserAddress } from "@/hooks/useAddress";
import { handleError } from "@/lib/handleError";
import { FormattedAddress } from "@/types";
import Link from "next/link";
import { useRef, useState } from "react";

function UserAddressHandler() {
	const popupRef = useRef<HTMLDivElement>(null);

	const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
	const { isPending, isError, data, error } = useUserAddress();
	const { mutateAsync: makeAddressDefault, isPending: isUpdatingDefaultAddress } =
		useMakeAddressDefault();

	async function handleMakeAddressDefault() {
		if (!selectedAddress) return;

		if (popupRef.current?.hidePopover) {
			popupRef.current.hidePopover();
		}

		await makeAddressDefault(selectedAddress);
		setSelectedAddress(null);
	}

	if (isPending) {
		return <p className="text-sm skeleton">&nbsp;</p>;
	}

	if (isError) {
		return <p className="text-sm text-error">{handleError(error)}</p>;
	}

	if (data?.address.length === 0) {
		return (
			<p className="text-sm">
				You have not entered an address for your location.
				<Link href="/user/account-details" className="link link-primary">
					Add Address
				</Link>
			</p>
		);
	}

	return (
		<div className="mb-4">
			<p className="text-sm">
				Delivery Method:{" "}
				<span className="text-xs text-gray-500 line-clamp-1">
					{data?.defaultAddress?.location}
				</span>
			</p>

			<button
				className="link link-primary text-xs"
				popoverTarget="delivery-method"
				style={
					{
						anchorName: "--anchor-1",
					} as React.CSSProperties
				}>
				Change
			</button>

			<div
				ref={popupRef}
				className="dropdown bg-base-100 border border-base-300 p-5 rounded-box shadow-sm"
				popover="auto"
				id="delivery-method"
				style={
					{
						positionAnchor: "--anchor-1",
					} as React.CSSProperties
				}>
				<div>
					{data?.address.map((address: FormattedAddress) => (
						<label
							key={address._id}
							className="flex items-center py-2 rounded-box gap-2">
							<input
								name="address"
								type="radio"
								disabled={address.default}
								checked={
									selectedAddress ===
									address._id
								}
								onChange={() =>
									setSelectedAddress(
										address._id
									)
								}
								className="radio radio-xs checked:radio-primary"
							/>

							<div>
								<p className="text-xs break-words max-w-[200px] line-clamp-2">
									({address.title}){" "}
									{address.location}{" "}
									{!!address.landmark &&
										` -- ${address.landmark}`}
								</p>
							</div>
						</label>
					))}

					<button
						disabled={
							isUpdatingDefaultAddress || !selectedAddress
						}
						onClick={handleMakeAddressDefault}
						className="btn btn-sm btn-primary">
						Make Default
					</button>
				</div>
			</div>
		</div>
	);
}

export default UserAddressHandler;
