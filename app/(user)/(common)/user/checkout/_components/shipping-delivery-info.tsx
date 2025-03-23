"use client";

import { getUserAddress } from "@/api";
import { handleError } from "@/lib/handleError";
import useCheckoutStore from "@/store/checkout-store";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { LuBadgeAlert, LuX } from "react-icons/lu";

function ShippingDeliveryInfo() {
	const modalRef = useRef<HTMLDialogElement>(null);
	const {} = useCheckoutStore();
	const { isPending, isLoading, isError, data, error } = useQuery({ queryKey: ["user-address"], queryFn: () => getUserAddress() });
	console.log(data);
	if (isPending) {
		return (
			<>
				<h3 className="text-gray-500 text-xs mb-2">Loading...</h3>
				<div className="flex flex-col gap-4">
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="flex items-center flex-1 py-2 px-4 border rounded-box">
							<div className="size-6 rounded-full skeleton">&nbsp;</div>
							<div className="flex-1">
								<p className="font-bold truncate max-w-[400px] mb-2 skeleton">&nbsp;</p>
								<p className="h-3 w-10 opacity-50 skeleton">&nbsp;</p>
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
						<p>You have not entered an address for your location</p>
					</div>
				) : (
					data.address.map((_, i) => (
						<label
							key={i}
							className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
							<input name="address" type="radio" className="radio radio-xs checked:radio-primary" />
							{/* <LuBox className="size-6" /> */}
							<div>
								<p className="font-bold truncate max-w-[400px]">
									(boys hostel) No 123 Agbro Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam iusto nemo, illo
									ut porro laboriosam! Explicabo similique, deserunt aspernatur libero voluptate laborum maiores beatae eius
									molestias dolorum mollitia, repellendus ea!
								</p>
								<p className="text-xs opacity-50">Delivery fee: free</p>
							</div>
						</label>
					))
				)}
			</fieldset>
			<button className="btn btn-neutral btn-block" onClick={() => modalRef.current?.showModal()}>
				Add new address
			</button>
			<dialog ref={modalRef} id="my_modal" className="modal">
				<div className="modal-box">
					<button type="button" className="btn btn-ghost btn-sm btn-circle absolute right-2 top-2" onClick={() => modalRef.current?.close()}>
						<LuX className="size-5" />
					</button>
					<h3 className="font-bold text-lg">Add New Address</h3>
					<form className="flex flex-col gap-4 mt-4">
						<input type="text" placeholder="Enter your address" className="input input-bordered w-full" />
						<select className="select w-full" name="region" id="region" defaultValue={""}>
							<option value="" disabled>
								-- select region --
							</option>
							<option value="1">Boys hostel</option>
						</select>
						<input type="text" placeholder="Landmark (if any)" className="input input-bordered w-full" />
						<div className="modal-action">
							<button type="submit" className="btn btn-primary">
								Save
							</button>
							<button type="button" className="btn" onClick={() => modalRef.current?.close()}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</dialog>
			{isLoading && <p>Loading...</p>}
		</>
	);
}

export default ShippingDeliveryInfo;
