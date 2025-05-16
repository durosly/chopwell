import IconArrowLeft from "@/icons/arrow-left";
// import IconDoubleCard from "@/icons/cards";
import IconCheck from "@/icons/check";
import IconCopy from "@/icons/copy";
import IconPhone from "@/icons/phone";
import IconWhatsapp from "@/icons/whatsapp";
import connectMongo from "@/lib/connectMongo";
import OrderModel from "@/models/order";
import logo from "@/public/images/chopwell-logo-dark.png";
import Image from "next/image";
import Link from "next/link";
import CopyToClipboardButton from "./_components/copy-to-clipboard";
import commaNumber from "@/utils/comma-number";
import pluralize from "pluralize";
import BackButton from "@/app/_components/back-button";
import ReOrderBtn from "../_components/re-order-btn";
import { Document } from "mongoose";

interface OrderProduct {
	_productId: {
		id: string;
		name: string;
		image: string;
	};
	price: string;
	quantity: number;
	unit?: string;
	label: string;
	id: string;
}

interface Order extends Document {
	id: string;
	code: string;
	status: "pending" | "preparing" | "delivering" | "successful";
	products: OrderProduct[];
	totalPrice: number;
}

async function OrderDetails({ params }: { params: Promise<{ orderId: string }> }) {
	const { orderId } = await params;
	await connectMongo();
	const order = (await OrderModel.findById(orderId).populate(
		"products._productId"
	)) as Order | null;

	if (!order) {
		return (
			<div className="max-w-4xl mx-auto px-4 py-6">
				<div className="text-center">
					<h2 className="text-2xl font-semibold mb-4">
						Order Not Found
					</h2>
					<p className="text-gray-600">
						The order you&apos;re looking for doesn&apos;t
						exist.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-6">
			<div className="flex items-center gap-4 mb-8">
				<BackButton className="btn btn-ghost btn-square">
					<IconArrowLeft className="size-5" />
				</BackButton>
				<h2 className="text-2xl font-semibold">Order Details</h2>
			</div>

			<div className="rounded-lg border border-base-300 p-6 mb-8">
				<div className="text-center mb-6">
					<h3 className="text-primary font-medium mb-4">
						Order Status
					</h3>
					<div className="mb-6">
						<p className="text-gray-600 mb-2">
							Order ID:{" "}
							{order.id.substring(order.id.length - 6)}
						</p>
						<CopyToClipboardButton
							code={order.code}
							className="bg-base-100 px-4 py-2 rounded-lg flex items-center gap-2 mx-auto hover:bg-gray-100 transition-colors cursor-pointer">
							<span className="font-semibold">
								{order.code}
							</span>
							<IconCopy className="size-4 text-gray-400" />
						</CopyToClipboardButton>
					</div>

					<div>
						<ul className="flex justify-center items-center gap-4 mb-4">
							{[
								{
									status: "pending",
									label: "Order received",
								},
								{
									status: "preparing",
									label: "Preparing your order",
								},
								{
									status: "delivering",
									label: "On the way",
								},
								{
									status: "successful",
									label: "Delivered",
								},
							].map((step, i) => {
								const isCompleted =
									[
										"pending",
										"preparing",
										"delivering",
										"successful",
									].indexOf(order.status) >=
									i;
								return (
									<li
										key={i}
										className="relative">
										<span
											className={`w-10 h-10 rounded-full flex justify-center items-center ${isCompleted ? "bg-primary" : "bg-neutral/50"} text-white`}>
											<IconCheck className="w-4 h-4" />
										</span>
										{i < 3 && (
											<div
												className={`absolute top-1/2 left-full w-4 h-0.5 ${isCompleted ? "bg-primary" : "bg-neutral/50"} -translate-y-1/2`}
											/>
										)}
									</li>
								);
							})}
						</ul>
						<p className="text-gray-500 font-medium">
							{order.status === "pending" &&
								"We've received your order and will start preparing it soon"}
							{order.status === "preparing" &&
								"Our chefs are preparing your delicious meal"}
							{order.status === "delivering" &&
								"Your order is on its way to you"}
							{order.status === "successful" &&
								"Your order has been delivered. Enjoy your meal!"}
						</p>
					</div>
				</div>
			</div>

			<div className="rounded-lg border border-base-300 p-6 mb-8">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
					<div className="relative h-12 w-32">
						<Image
							src={logo}
							alt="chopwell"
							fill
							className="object-contain"
							sizes="128px"
						/>
					</div>

					<div className="flex gap-4">
						<a
							className="btn btn-ghost btn-circle hover:bg-gray-100"
							href="tel://+2347063069903"
							target="_blank"
							rel="noopener noreferrer">
							<IconPhone className="w-6 h-6" />
						</a>
						<a
							className="btn btn-ghost btn-circle hover:bg-gray-100"
							href="https://wa.me/+2347063069903"
							target="_blank"
							rel="noopener noreferrer">
							<IconWhatsapp className="w-6 h-6" />
						</a>
					</div>
				</div>
			</div>

			<div className="rounded-lg border border-base-300 p-6 mb-8">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
					<h2 className="text-xl font-semibold">Order Summary</h2>
					<CopyToClipboardButton
						code={order.code}
						className="bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors">
						<span className="font-semibold">{order.code}</span>
						<IconCopy className="w-4 h-4 text-gray-400" />
					</CopyToClipboardButton>
				</div>

				<ul className="space-y-6 mb-6">
					{order.products.map(
						(product: {
							id: string;
							_productId: {
								id: string;
								name: string;
								image: string;
							};
							price: string;
							quantity: number;
							unit?: string;
							label: string;
						}) => (
							<li key={product.id}>
								<Link
									href={`/product/${product._productId.id}`}
									className="block hover:bg-gray-50 rounded-lg p-3 transition-colors">
									<div className="flex flex-wrap items-center gap-4">
										<div className="relative size-16 rounded-lg overflow-hidden">
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
												fill
												className="object-cover"
												sizes="64px"
											/>
										</div>
										<div className="flex-1">
											<h3 className="font-medium line-clamp-1">
												{
													product
														._productId
														.name
												}
											</h3>
											<p className="text-sm text-gray-600 whitespace-nowrap">
												{pluralize(
													product?.unit ||
														"piece",
													product.quantity,
													true
												)}
											</p>
										</div>
										<div className="text-right">
											<p className="font-semibold">
												{commaNumber(
													product.price
												)}
											</p>
										</div>
									</div>
								</Link>
							</li>
						)
					)}
				</ul>

				<div className="flex justify-between items-center border-t pt-4">
					<span className="font-medium">Total:</span>
					<div>
						<span className="text-xl font-bold">
							{commaNumber(order.totalPrice)}
						</span>
						<p className="text-gray-500 text-xs">
							+ delivery fee
						</p>
					</div>
				</div>
			</div>

			<div className="mb-8">
				<ReOrderBtn
					orderId={order.id}
					className="btn btn-primary w-full rounded-lg">
					Re-order
				</ReOrderBtn>
			</div>

			{/* <div className="bg-base-100 rounded-lg border border-base-300 p-6 mb-8">
				<h2 className="text-xl font-semibold mb-6">Order Timeline</h2>
				<ul className="space-y-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<li
							key={i}
							className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
							<span className="font-medium">
								Waiting for acceptance
							</span>
							<span className="text-gray-600">
								28 January 2025 at 12:34 PM
							</span>
						</li>
					))}
				</ul>
			</div>

			<div className="bg-base-100 rounded-lg border border-base-300 p-6">
				<h2 className="text-xl font-semibold mb-6">Payment Details</h2>
				<div className="flex items-center gap-4">
					<IconDoubleCard className="w-12 h-12 text-primary" />
					<div>
						<p className="font-medium">Mastercard ****3712</p>
						<p className="text-sm text-gray-600">
							08/01/2025 21:07
						</p>
					</div>
				</div>
			</div> */}
		</div>
	);
}

export default OrderDetails;
