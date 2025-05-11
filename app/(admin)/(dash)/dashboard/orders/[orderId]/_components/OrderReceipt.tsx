"use client";

import Image from "next/image";
import commaNumber from "@/utils/comma-number";
import type { PopulatedOrder } from "../types";

interface OrderReceiptProps {
	order: PopulatedOrder;
}

function OrderReceipt({ order }: OrderReceiptProps) {
	return (
		<div className="w-[210mm] min-h-[297mm] p-8 bg-white text-black">
			{/* Header */}
			<div className="text-center mb-8">
				<h1 className="text-2xl font-bold mb-2">Chopwell</h1>
				<p className="text-sm text-gray-600">Order Receipt</p>
			</div>

			{/* Order Info */}
			<div className="grid grid-cols-2 gap-8 mb-8">
				<div>
					<h2 className="text-lg font-semibold mb-4">
						Order Information
					</h2>
					<div className="space-y-2 text-sm">
						<p>
							<span className="font-medium">
								Order Code:
							</span>{" "}
							{order.code}
						</p>
						<p>
							<span className="font-medium">Date:</span>{" "}
							{new Date(order.createdAt).toLocaleString()}
						</p>
						<p>
							<span className="font-medium">Status:</span>{" "}
							{order.status}
						</p>
						<p>
							<span className="font-medium">
								Payment:
							</span>{" "}
							{order.payment_status ? "Paid" : "Unpaid"}
						</p>
						<p>
							<span className="font-medium">
								Delivery Method:
							</span>{" "}
							{order.method_of_delivery}
						</p>
					</div>
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-4">
						Customer Information
					</h2>
					<div className="space-y-2 text-sm">
						<p>
							<span className="font-medium">Name:</span>{" "}
							{order._userId.firstname}{" "}
							{order._userId.lastname}
						</p>
						{order._userId.email && (
							<p>
								<span className="font-medium">
									Email:
								</span>{" "}
								{order._userId.email}
							</p>
						)}
						{order._userId.phone && (
							<p>
								<span className="font-medium">
									Phone:
								</span>{" "}
								{order._userId.phone}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Delivery Info */}
			{order.method_of_delivery === "delivery" && (
				<div className="mb-8">
					<h2 className="text-lg font-semibold mb-4">
						Delivery Information
					</h2>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<p>
							<span className="font-medium">
								Location:
							</span>{" "}
							{order.delivery_address?.location || "N/A"}
						</p>
						<p>
							<span className="font-medium">
								Landmark:
							</span>{" "}
							{order.delivery_address?.landmark || "N/A"}
						</p>
						<p>
							<span className="font-medium">Region:</span>{" "}
							{order.delivery_address?._regionId?.title ||
								"N/A"}
						</p>
						<p>
							<span className="font-medium">
								Delivery Fee:
							</span>{" "}
							{commaNumber(order.deliveryPrice || 0)}
						</p>
					</div>
				</div>
			)}

			{/* Products */}
			<div className="mb-8">
				<h2 className="text-lg font-semibold mb-4">Order Items</h2>
				<div className="border-t border-b border-gray-200">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-gray-200">
								<th className="py-2 text-left">
									Item
								</th>
								<th className="py-2 text-right">
									Quantity
								</th>
								<th className="py-2 text-right">
									Price
								</th>
								<th className="py-2 text-right">
									Total
								</th>
							</tr>
						</thead>
						<tbody>
							{order.products.map((product, index) => (
								<tr
									key={index}
									className="border-b border-gray-100">
									<td className="py-3">
										<div className="flex items-center gap-3">
											<div className="relative size-12">
												<Image
													src={
														product
															._productId
															.image
													}
													alt={
														product
															._productId
															.name
													}
													className="object-cover rounded"
													fill
												/>
											</div>
											<div>
												<p className="font-medium">
													{
														product
															._productId
															.name
													}
												</p>
												<p className="text-xs text-gray-600">
													{
														product.label
													}
												</p>
											</div>
										</div>
									</td>
									<td className="py-3 text-right">
										{product.quantity}{" "}
										{product.unit}
									</td>
									<td className="py-3 text-right">
										{commaNumber(
											product.price
										)}
									</td>
									<td className="py-3 text-right">
										{commaNumber(
											Number(
												product.price
											) *
												product.quantity
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Summary */}
			<div className="border-t border-gray-200 pt-4">
				<div className="max-w-xs ml-auto space-y-2 text-sm">
					<div className="flex justify-between">
						<span>Subtotal:</span>
						<span>
							{commaNumber(
								order.totalPrice -
									(order.deliveryPrice || 0)
							)}
						</span>
					</div>
					{order.method_of_delivery === "delivery" && (
						<div className="flex justify-between">
							<span>Delivery Fee:</span>
							<span>
								{commaNumber(
									order.deliveryPrice || 0
								)}
							</span>
						</div>
					)}
					<div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
						<span>Total:</span>
						<span>{commaNumber(order.totalPrice)}</span>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
				<p>Thank you for your order!</p>
				<p>For any questions, please contact our support team.</p>
			</div>
		</div>
	);
}

export default OrderReceipt;
