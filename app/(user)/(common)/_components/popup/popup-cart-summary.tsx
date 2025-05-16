"use client";

import { useGetUserCart } from "@/hooks/useCart";
import commaNumber from "@/utils/comma-number";

function PopupCartSummary() {
	const { data, isPending, isError } = useGetUserCart();

	if (isPending || isError) return;

	return (
		<div>
			<ul className="mb-2">
				<li className="flex justify-between gap-5 text-sm">
					<span className="text-gray-500">Subtotal</span>
					<span className="font-semibold">
						{commaNumber(data.subtotal)}
					</span>
				</li>
				<li className="flex justify-between gap-5 text-sm">
					<span className="text-gray-500">Delivery</span>
					<span className="font-semibold">
						{commaNumber(data.delivery)}
					</span>
				</li>
				<li className="flex justify-between gap-5 text-sm mb-1">
					<span className="text-gray-500">Discount</span>
					<span className="font-semibold">
						{commaNumber(data.discount)}
					</span>
				</li>
				<li className="flex justify-between gap-5">
					<span className="font-bold">Total</span>
					<span className="font-bold">{commaNumber(data.total)}</span>
				</li>
			</ul>
		</div>
	);
}

export default PopupCartSummary;
