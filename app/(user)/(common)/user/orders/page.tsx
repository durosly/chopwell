import BackButton from "@/app/_components/back-button";
import { auth } from "@/auth";
import IconArrowLeft from "@/icons/arrow-left";
import connectMongo from "@/lib/connectMongo";
import OrderModel from "@/models/order";
import { cn } from "@/utils/cn";
import commaNumber from "@/utils/comma-number";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

async function OrderPage() {
	const session = await auth();
	const userId = session?.user.id;

	await connectMongo();

	const orders = await OrderModel.find({ _userId: userId })
		.populate("products._productId")
		.sort("-createdAt")
		.limit(10);

	const statusClass = {
		pending: "badge-neutral",
		preparing: "badge-warning",
		delivering: "badge-info",
		successful: "badge-success",
	} as const;

	type OrderStatus = keyof typeof statusClass;

	if (orders.length === 0) {
		return (
			<div className="min-h-screen">
				<div className="px-4 mb-10">
					<div className="max-w-4xl mx-auto flex items-center gap-4">
						<BackButton className="btn btn-ghost btn-square">
							<IconArrowLeft className="size-5" />
						</BackButton>
						<h1 className="text-2xl font-bold text-center flex-1">
							My Orders
						</h1>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<p className="text-gray-400">You have no orders yet.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			{/* Header Section */}
			<div className="px-4 mb-10">
				<div className="max-w-4xl mx-auto flex items-center gap-4">
					<BackButton className="btn btn-ghost btn-square">
						<IconArrowLeft className="size-5" />
					</BackButton>
					<h1 className="text-2xl font-bold text-center flex-1">
						My Orders
					</h1>
				</div>
			</div>

			{/* Orders List */}
			<div className="max-w-4xl mx-auto p-4 mb-10">
				<div className="space-y-6">
					{orders.map((order) => (
						<div
							key={order.id}
							className="card bg-base-100 border border-base-300">
							<div className="card-body">
								{/* Order Date */}
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-lg font-semibold text-base-content">
										{format(
											new Date(
												order.createdAt
											),
											"dd MMM yyyy, h:mm a"
										)}
									</h2>
									<span
										className={cn(
											"badge badge-soft badge-sm capitalize",
											statusClass[
												order.status as OrderStatus
											]
										)}>
										{order.status}
									</span>
								</div>

								{/* Order Item */}
								<div className="flex gap-4">
									<div className="relative w-20 h-20 rounded-xl overflow-hidden">
										<Image
											src={
												order
													.products[0]
													._productId
													.image
											}
											alt={
												order
													.products[0]
													._productId
													.name
											}
											fill
											className="object-cover"
											sizes="96px"
										/>
									</div>

									<div className="flex-1">
										<h3 className="text-lg font-medium">
											{
												order
													.products[0]
													._productId
													.name
											}
										</h3>
										<div className="text-sm text-base-content/70 space-y-1">
											<p>
												{
													order
														.products[0]
														.quantity
												}{" "}
												items
												×{" "}
												{commaNumber(
													order
														.products[0]
														.price
												)}
											</p>
										</div>
									</div>
								</div>

								{/* Order Actions */}
								<div className="card-actions justify-end ">
									<Link
										href={`/user/orders/${order.id}`}
										className="btn btn-ghost btn-sm">
										View Details
									</Link>
									<button className="btn btn-primary btn-sm">
										Re-order
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default OrderPage;
