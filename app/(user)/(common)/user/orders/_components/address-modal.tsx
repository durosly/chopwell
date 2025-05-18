"use client";

import { getUserAddress } from "@/api";
import { handleError } from "@/lib/handleError";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LuBadgeAlert } from "react-icons/lu";
import ShippingDeliveryAddressModal from "../../checkout/_components/shipping-delivery-address-modal";
import { FormattedAddress } from "@/types";
import commaNumber from "@/utils/comma-number";
import { toast } from "sonner";

function AddressModal({
	setIsOpen,
	mutate,
}: {
	setIsOpen: (isOpen: boolean) => void;
	mutate: (addressId: string) => void;
}) {
	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
	const [option, setOption] = useState<"yes" | "no" | "">("");
	const [selectedAddress, setSelectedAddress] = useState<string>("");
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["user-address"],
		queryFn: () => getUserAddress(),
		enabled: option === "no",
	});

	function handleOption(choice: "yes" | "no") {
		setOption(choice);

		if (choice === "yes") {
			setIsOpen(false);
			mutate("default");
		}
	}

	function handleDone() {
		if (!selectedAddress) {
			toast.error("Please select an address");
			return;
		}
		mutate(selectedAddress);
		setIsOpen(false);
	}

	return (
		<dialog className="modal modal-bottom sm:modal-middle modal-open">
			<div className="modal-box">
				<button
					onClick={() => setIsOpen(false)}
					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
					✕
				</button>

				<h3 className="font-bold text-xl">Address</h3>
				{option === "" ? (
					<>
						<p>Do you wish to use same address for delivery?</p>
						{/* yes or no button */}
						<div className="flex gap-2 mt-2">
							<button
								onClick={() => handleOption("yes")}
								className="btn btn-primary">
								Yes
							</button>
							<button
								onClick={() => handleOption("no")}
								className="btn btn-outline">
								No
							</button>
						</div>
					</>
				) : option === "no" ? (
					<>
						{isPending ? (
							<>
								<h3 className="text-gray-500 text-xs mb-2">
									Loading...
								</h3>
								<div className="flex flex-col gap-4">
									{Array.from({
										length: 3,
									}).map((_, i) => (
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
						) : isError ? (
							<div
								role="alert"
								className="alert alert-outline">
								<LuBadgeAlert className="size-8 shrink-0" />
								<div>
									<h3 className="font-bold">
										Notice
									</h3>
									<span className="text-xs">
										{handleError(error)}
									</span>
								</div>
							</div>
						) : (
							<>
								<h3 className="font-bold">
									Delivery shipping
								</h3>
								<fieldset className="fieldset gap-4">
									<legend className="sr-only">
										Address
									</legend>
									{data?.address.length ===
									0 ? (
										<div>
											<h3 className="font-bold">
												Notice
											</h3>
											<p>
												You
												have
												not
												entered
												an
												address
												for
												your
												location
											</p>
										</div>
									) : (
										data.address.map(
											(
												address: FormattedAddress
											) => (
												<label
													key={
														address._id
													}
													className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
													<input
														name="address"
														type="radio"
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
													{/* <LuBox className="size-6" /> */}
													<div>
														<p className="font-bold break-words max-w-[400px]">
															(
															{
																address.title
															}

															){" "}
															{
																address.location
															}{" "}
															{!!address.landmark &&
																` -- ${address.landmark}`}
														</p>
														<p className="text-xs opacity-50">
															Delivery
															fee:{" "}
															{address.deliveryPrice >
															0
																? commaNumber(
																		address.deliveryPrice
																	)
																: "Free"}
														</p>
													</div>
												</label>
											)
										)
									)}
								</fieldset>
								{data?.address.length > 0 && (
									<button
										onClick={handleDone}
										className="btn btn-primary btn-block mt-2">
										Done
									</button>
								)}

								{isAddressModalOpen && (
									<ShippingDeliveryAddressModal
										setIsOpen={
											setIsAddressModalOpen
										}
									/>
								)}
							</>
						)}
						<div className="mt-5 flex flex-wrap gap-2">
							<button
								className="btn btn-neutral"
								onClick={() =>
									setIsAddressModalOpen(true)
								}>
								Add new address
							</button>
							<button
								onClick={() => setOption("")}
								className="btn btn-outline">
								Return
							</button>
						</div>
					</>
				) : (
					<>
						<p>Delivery address is same as shipping address</p>
					</>
				)}
			</div>
		</dialog>
	);
}

export default AddressModal;
