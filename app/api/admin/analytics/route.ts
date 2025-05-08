import { NextResponse } from "next/server";
import OrderModel from "@/models/order";
import UserModel from "@/models/user";
import TransactionModel from "@/models/transactions";
import connectMongo from "@/lib/connectMongo";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get("type");
	const startDate = searchParams.get("startDate");
	const endDate = searchParams.get("endDate");
	const status = searchParams.get("status");
	await connectMongo();

	try {
		switch (type) {
			case "orders":
				const orders = await OrderModel.find({
					...(startDate && endDate
						? {
								createdAt: {
									$gte: new Date(startDate),
									$lte: new Date(endDate),
								},
							}
						: {}),
					...(status ? { status } : {}),
				})
					.populate("_userId")
					.populate("products._productId")
					.sort({ createdAt: -1 });
				return NextResponse.json(orders);

			case "users":
				const users = await UserModel.find({
					...(startDate && endDate
						? {
								createdAt: {
									$gte: new Date(startDate),
									$lte: new Date(endDate),
								},
							}
						: {}),
				}).populate({
					path: "orders",
					model: OrderModel,
				});
				return NextResponse.json(users);

			case "deposits":
				const deposits = await TransactionModel.find({
					...(startDate && endDate
						? {
								createdAt: {
									$gte: new Date(startDate),
									$lte: new Date(endDate),
								},
							}
						: {}),
					...(status ? { status } : {}),
					type: "deposit",
				})
					.populate("_userId")
					.sort({ createdAt: -1 });
				return NextResponse.json(deposits);

			default:
				return NextResponse.json(
					{ error: "Invalid analytics type" },
					{ status: 400 }
				);
		}
	} catch (error) {
		console.error("Analytics error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch analytics data" },
			{ status: 500 }
		);
	}
}
