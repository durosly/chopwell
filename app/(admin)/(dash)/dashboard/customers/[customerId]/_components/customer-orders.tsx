import connectMongo from "@/lib/connectMongo";
import OrderModel from "@/models/order";
import Link from "next/link";
import commaNumber from "@/utils/comma-number";

interface CustomerOrdersProps {
	customerId: string;
}

async function CustomerOrders({ customerId }: CustomerOrdersProps) {
	await connectMongo();

	const orders = await OrderModel.find({ _userId: customerId })
		.sort("-createdAt")
		.limit(5)
		.select("code totalPrice status createdAt");

	if (!orders.length) {
		return <p className="text-gray-500">No orders found</p>;
	}

	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr>
						<th>Order Code</th>
						<th>Amount</th>
						<th>Status</th>
						<th>Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.id}>
							<td>{order.code}</td>
							<td>{commaNumber(order.totalPrice)}</td>
							<td>
								<span
									className={`badge capitalize ${
										order.status ===
										"successful"
											? "badge-success"
											: order.status ===
												  "pending"
												? "badge-warning"
												: order.status ===
													  "preparing"
													? "badge-info"
													: "badge-error"
									}`}>
									{order.status}
								</span>
							</td>
							<td>
								{new Date(
									order.createdAt
								).toLocaleDateString()}
							</td>
							<td>
								<Link
									href={`/dashboard/orders/${order.id}`}
									className="btn btn-ghost btn-sm">
									View
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default CustomerOrders;
