import connectMongo from "@/lib/connectMongo";
import OrderModel, { OrderData } from "@/models/order";
import { notFound } from "next/navigation";
import OrderStatusManager from "./_components/order-status-manager";
import Image from "next/image";
import commaNumber from "@/utils/comma-number";
import getStatusIcon from "../../_components/get-status-icon";

type PopulatedOrder = Omit<OrderData, "_userId" | "products" | "delivery_address"> & {
	_id: string;
	_userId: {
		_id: string;
		firstname: string;
		lastname: string;
		email: string;
		phone: string;
	};
	products: Array<{
		_productId: {
			_id: string;
			name: string;
			image: string;
			price: number;
		};
		price: string;
		quantity: number;
		hasReview: boolean;
		label: string;
		unit: string;
	}>;
	delivery_address: {
		location: string;
		landmark: string;
		_regionId: {
			_id: string;
			title: string;
			deliveryPrice: number;
		};
	};
	createdAt: Date;
	updatedAt: Date;
};

async function OrderDetailsPage({ params }: { params: Promise<{ orderId: string }> }) {
	const { orderId } = await params;
	await connectMongo();

	const order = (await OrderModel.findById(orderId)
		.populate("_userId", "firstname lastname email phone")
		.populate("products._productId", "name image price")
		.populate("delivery_address._regionId", "title deliveryPrice")
		.lean()) as PopulatedOrder | null;

	if (!order) {
		notFound();
	}

	return (
		<div className="mb-5 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="card-title text-2xl">Order #{order.code}</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Customer Information */}
				<div className="card bg-base-100">
					<div className="card-body">
						<h2 className="card-title text-lg">
							Customer Information
						</h2>
						<div className="space-y-2">
							<p>
								<span className="font-medium">
									Name:
								</span>{" "}
								{order._userId.firstname}{" "}
								{order._userId.lastname}
							</p>
							{order._userId.phone && (
								<p>
									<span className="font-medium">
										Phone:
									</span>{" "}
									{order._userId.phone}
								</p>
							)}
							{order._userId.email && (
								<p>
									<span className="font-medium">
										Email:
									</span>{" "}
									{order._userId.email}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Order Information */}
				<div className="card bg-base-100">
					<div className="card-body">
						<h2 className="card-title text-lg">
							Order Information
						</h2>
						<div className="space-y-2">
							<p>
								<span className="font-medium">
									Order Code:
								</span>{" "}
								{order.code}
							</p>
							<p>
								<span className="font-medium">
									Order Status:
								</span>{" "}
								<span
									className={`badge badge-soft capitalize gap-1 ${
										order.status ===
										"successful"
											? "badge-success"
											: order.status ===
												  "pending"
												? "badge-warning"
												: order.status ===
													  "preparing"
													? "badge-info"
													: order.status ===
														  "delivering"
														? "badge-info"
														: order.status ===
															  "cancelled"
															? "badge-error"
															: "badge-neutral"
									}`}>
									{getStatusIcon(
										order.status
									)}
									{order.status}
								</span>
							</p>
							<p>
								<span className="font-medium">
									Delivery Method:
								</span>{" "}
								{order.method_of_delivery}
							</p>
							<p>
								<span className="font-medium">
									Payment Status:
								</span>
								<span
									className={`badge ${order.payment_status ? "badge-success" : "badge-error"} ml-2`}>
									{order.payment_status
										? "Paid"
										: "Unpaid"}
								</span>
							</p>
							<p>
								<span className="font-medium">
									Order Date:
								</span>{" "}
								{new Date(
									order.createdAt
								).toLocaleString()}
							</p>
						</div>
					</div>
				</div>

				{/* Delivery Information */}
				{order.method_of_delivery === "delivery" && (
					<div className="card bg-base-100">
						<div className="card-body">
							<h2 className="card-title text-lg">
								Delivery Information
							</h2>
							<div className="space-y-2">
								<p>
									<span className="font-medium">
										Location:
									</span>{" "}
									{
										order
											.delivery_address
											.location
									}
								</p>
								<p>
									<span className="font-medium">
										Landmark:
									</span>{" "}
									{
										order
											.delivery_address
											.landmark
									}
								</p>
								<p>
									<span className="font-medium">
										Region:
									</span>{" "}
									{
										order
											.delivery_address
											._regionId
											.title
									}
								</p>
								<p>
									<span className="font-medium">
										Delivery Fee:
									</span>{" "}
									{commaNumber(
										order?.deliveryPrice ||
											0
									)}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Order Items */}
				<div className="card bg-base-100 md:col-span-2">
					<div className="card-body">
						<h2 className="card-title text-lg">Order Items</h2>
						<div className="space-y-4">
							{order.products.map((product, index) => (
								<div
									key={index}
									className="flex items-center justify-between border-b border-base-300 pb-4">
									<div className="flex items-center space-x-4">
										<div className="avatar">
											<div className="relative size-16 rounded-lg">
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
													className="object-cover"
													fill
												/>
											</div>
										</div>
										<div>
											<h3 className="font-medium">
												{
													product
														._productId
														.name
												}
											</h3>
											<p className="text-sm opacity-70">
												{
													product.label
												}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-medium">
											{commaNumber(
												product.price
											)}
										</p>
										<p className="text-sm opacity-70">
											Qty:{" "}
											{
												product.quantity
											}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<span className="font-medium">
									Subtotal:
								</span>
								<span>
									{commaNumber(
										order.totalPrice -
											order?.deliveryPrice ||
											0
									)}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="font-medium">
									Delivery Fee:
								</span>
								<span>
									{commaNumber(
										order?.deliveryPrice ||
											0
									)}
								</span>
							</div>
							<div className="flex justify-between items-center text-lg font-bold">
								<span>Total:</span>
								<span>
									{commaNumber(
										order.totalPrice
									)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<OrderStatusManager
				orderId={order._id.toString()}
				currentStatus={order.status}
			/>
		</div>
	);
}

export default OrderDetailsPage;
