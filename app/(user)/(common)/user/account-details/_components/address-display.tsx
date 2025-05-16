"use client";

import { useUserAddress } from "@/hooks/useAddress";
import IconArrowLeft from "@/icons/arrow-left";
import { handleError } from "@/lib/handleError";
import { FormattedAddress } from "@/types";
import Link from "next/link";
import { LuBadgeAlert } from "react-icons/lu";
import MakeAddressDefaultBtn from "./make-address-default-btn";

function AddressDisplay() {
	const { isPending, isLoading, isError, data, error } = useUserAddress();

	if (isPending) {
		return (
			<li>
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
			</li>
		);
	}

	if (isError) {
		return (
			<li>
				<div role="alert" className="alert alert-outline">
					<LuBadgeAlert className="size-8 shrink-0" />
					<div>
						<h3 className="font-bold">Notice</h3>
						<span className="text-xs">
							{handleError(error)}
						</span>
					</div>
				</div>
			</li>
		);
	}

	return (
		<>
			{data?.address.length === 0 ? (
				<li>
					<div>
						<h3 className="font-bold">Notice</h3>
						<p>
							You have not entered an address for your
							location
						</p>
					</div>
				</li>
			) : (
				data.address.map((address: FormattedAddress) => (
					// <label
					//     key={address._id}
					//     className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
					//     <input
					//         name="address"
					//         type="radio"
					//         checked={selectedAddress === address._id}
					//         onChange={() => setAddress({ address: address._id, deliveryFee: address.deliveryPrice })}
					//         className="radio radio-xs checked:radio-primary"
					//     />
					//     {/* <LuBox className="size-6" /> */}
					//     <div>
					//         <p className="font-bold break-words max-w-[400px]">
					//             ({address.title}) {address.location} {!!address.landmark && ` -- ${address.landmark}`}
					//         </p>
					//         <p className="text-xs opacity-50">
					//             Delivery fee: {address.deliveryPrice > 0 ? commaNumber(address.deliveryPrice) : "Free"}
					//         </p>
					//     </div>
					// </label>

					<li key={address._id} className="bg-base-200/50 rounded">
						<Link
							className="flex items-center justify-between py-3 px-4 gap-5"
							href={`/user/account-details/${address._id}`}>
							<span>{address.title}</span>

							<div className="flex items-center gap-3">
								<span className=" line-clamp-1">
									{address.location}
								</span>
								<IconArrowLeft className="flex-shrink-0 w-5 h-5 rotate-180" />
							</div>
						</Link>
						<div className="flex justify-end px-4 pb-3">
							{address.default ? (
								<span className="text-xs text-gray-500 italic">
									Default
								</span>
							) : (
								<MakeAddressDefaultBtn
									addressId={address._id}
								/>
							)}
						</div>
					</li>
				))
			)}
			{isLoading && (
				<li>
					<span className="loading loading-spinner"></span>
					<span>Loading...</span>
				</li>
			)}
		</>
	);
}

export default AddressDisplay;
