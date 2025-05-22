"use client";
import dynamic from "next/dynamic";

const IconsHandler = dynamic(() => import("./icons-handle"), {
	ssr: false,
	loading: () => (
		<div>
			<span className="loading loading-spinner"></span> Loading...
		</div>
	),
});
import orderCodeIcon from "@/public/animations/wired-outline-497-truck-delivery-loop-cycle.json"; // You need to download a suitable free Lordicon Lottie JSON and place it here

export default function CheckoutOrder() {
	return (
		<div className="flex flex-col items-center justify-center bg-base-100 rounded-xl p-6 gap-4">
			<IconsHandler icon={orderCodeIcon} />
			<div className="text-center">
				<h3 className="text-lg font-bold mb-2">Checkout Order</h3>
				<p className="text-sm text-gray-500 mb-4">
					Checkout your order to get items delivered to your home in
					minutes
				</p>
				<button type="submit" className="btn btn-primary w-full sm:w-auto">
					Checkout Order
				</button>

				<p className="text-sm text-gray-500 mb-4 mt-2">
					Or you can book order for later and to share with your
					friends and family
				</p>
				<p className="text-xs text-gray-500 italic">
					We do our best to reduce the number of steps it takes to
					place an order
				</p>
			</div>
		</div>
	);
}
