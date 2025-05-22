"use client";
import dynamic from "next/dynamic";

const IconsHandler = dynamic(() => import("./icons-handle"), { ssr: false });
import orderCodeIcon from "@/public/animations/wired-outline-139-basket-morph-fill.json"; // You need to download a suitable free Lordicon Lottie JSON and place it here

export default function OrderCodeEntry() {
	return (
		<div className="flex flex-col items-center justify-center bg-base-100 rounded-xl p-6 gap-4">
			<IconsHandler icon={orderCodeIcon} />

			<div className="text-center">
				<h3 className="text-lg font-bold mb-2">Quickly place order</h3>
				<p className="text-sm text-gray-500 mb-4">
					Use the order code you got from your friend or family
				</p>
				<button type="submit" className="btn btn-primary w-full sm:w-auto">
					Place Order
				</button>

				<p className="text-sm text-gray-500 mb-4 mt-2">
					Or scan the QR code to place order
				</p>
				<p className="text-xs text-gray-500 italic">
					We do our best to reduce the number of steps it takes to
					place an order
				</p>
			</div>
		</div>
	);
}
