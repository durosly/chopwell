"use client";

import useCheckoutStore from "@/store/checkout-store";
import { CartResponse } from "@/types";
import { PropsWithChildren, useEffect, useRef } from "react";

type PropType = PropsWithChildren<{ data: CartResponse }>;

function HydrateStore({ children, data: checkoutData }: PropType) {
	const { initCheckout } = useCheckoutStore();
	const statusRef = useRef(false);

	useEffect(() => {
		initCheckout(checkoutData);
		statusRef.current = true;
	}, [checkoutData, initCheckout]);
	if (statusRef.current === false)
		return (
			<div className="py-20">
				<div className="px-10">
					<h2 className="text-center mb-5">Checking device compactability...</h2>
					<div className="h-10 skeleton"></div>
				</div>
			</div>
		);

	return <>{children}</>;
}

export default HydrateStore;
