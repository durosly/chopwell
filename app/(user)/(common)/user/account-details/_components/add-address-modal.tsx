"use client";

import { useState } from "react";
import ShippingDeliveryAddressModal from "../../checkout/_components/shipping-delivery-address-modal";

function AddNewUserAddress() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button onClick={() => setIsOpen(true)} className="btn btn-block">
				+ Add new address +
			</button>

			{isOpen && <ShippingDeliveryAddressModal setIsOpen={setIsOpen} />}
		</>
	);
}

export default AddNewUserAddress;
