"use client";

import useCheckoutStore from "@/store/checkout-store";

function ShippingMethodInfo() {
	const { deliveryMethod } = useCheckoutStore();

	if (deliveryMethod === "pickup") {
		return (
			<>
				<h3 className="font-bold">Pickup Order</h3>
				<div>
					<p>Ensure to visit our shop before closing hours</p>
				</div>
			</>
		);
	} else if (deliveryMethod === "delivery") {
		return (
			<>
				<h3 className="font-bold">Delivery shipping</h3>
				<fieldset className="fieldset gap-4">
					<legend className="sr-only">Address</legend>
					{Array.from({ length: 3 }).map((_, i) => (
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
					))}
				</fieldset>
			</>
		);
	} else {
		return null;
	}
}

export default ShippingMethodInfo;
