import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import OrderModel from "@/models/order";
import { withAdminAuth } from "@/utils/with-admin-auth";
import { NextRequest } from "next/server";

async function getOrdersAnalytics(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const startDate = searchParams.get("startDate");
		const endDate = searchParams.get("endDate");
		const status = searchParams.get("status");

		await connectMongo();

		const query: { createdAt?: { $gte?: Date; $lte?: Date }; status?: string } = {};

		if (startDate && endDate) {
			query.createdAt = {
				$gte: new Date(startDate),
				$lte: new Date(endDate),
			};
		} else if (startDate) {
			query.createdAt = {
				$gte: new Date(startDate),
			};
		} else if (endDate) {
			query.createdAt = {
				$lte: new Date(endDate),
			};
		}

		if (status) {
			query.status = status;
		}

		const orders = await OrderModel.find(query);

		// process chart data
		const chartData = orders?.reduce(
			(
				acc: { date: string; total: number; count: number }[],
				order: { totalPrice: number; createdAt: Date }
			) => {
				const date = new Date(order.createdAt).toLocaleDateString();
				const existing = acc.find((item) => item.date === date);
				if (existing) {
					existing.total += order.totalPrice;
					existing.count += 1;
				} else {
					acc.push({ date, total: order.totalPrice, count: 1 });
				}
				return acc;
			},
			[]
		);

		const revenue = orders?.reduce(
			(acc: number, order: { totalPrice: number }) => acc + order.totalPrice,
			0
		);

		const data = { totalOrders: orders.length, revenue, chartData };

		return Response.json(data);
	} catch (error) {
		const message = handleError(error);
		console.log(message);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(getOrdersAnalytics);
