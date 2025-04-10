"use client";

import { useRef } from "react";
import ShippingDeliveryAddressModal from "../../checkout/_components/shipping-delivery-address-modal";

function AddNewUserAddress() {
	const modalRef = useRef<HTMLDialogElement>(null);

	return (
		<>
			<button
				onClick={() => modalRef.current?.showModal()}
				className="btn btn-block">
				+ Add new address +
			</button>

			<ShippingDeliveryAddressModal modalRef={modalRef} />
		</>
	);
}

export default AddNewUserAddress;
