"use client";

import useCheckoutStore from "@/store/checkout-store";
import { LuBox, LuTruck } from "react-icons/lu";

function ShippingMethod() {
	const { deliveryMethod, setDeliveryMethod } = useCheckoutStore();
	return (
		<>
			<h3 className="font-bold">Shipping info</h3>
			<fieldset className="fieldset @sm:grid-cols-2 gap-4">
				<legend className="sr-only">Shipping method</legend>
				<label className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
					<LuTruck className="size-6" />
					<span>Delivery</span>
					<input
						name="delivery"
						type="radio"
						checked={deliveryMethod === "delivery"}
						onChange={() => setDeliveryMethod("delivery")}
						className="radio radio-xs checked:radio-primary ml-auto"
					/>
				</label>
				<label className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
					<LuBox className="size-6" />
					<span>Pickup</span>
					<input
						name="delivery"
						type="radio"
						checked={deliveryMethod === "pickup"}
						onChange={() => setDeliveryMethod("pickup")}
						className="radio radio-xs checked:radio-primary ml-auto"
					/>
				</label>
			</fieldset>
		</>
	);
}

export default ShippingMethod;
