import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import TransactionModel from "@/models/transactions";
import { withAdminAuth } from "@/utils/with-admin-auth";
import { NextRequest } from "next/server";

async function getDepositsAnalytics(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const startDate = searchParams.get("startDate");
		const endDate = searchParams.get("endDate");
		const status = searchParams.get("status");

		await connectMongo();

		const query: {
			createdAt?: { $gte?: Date; $lte?: Date };
			status?: string;
			type?: string;
		} = {
			type: "deposit",
		};

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

		const deposits = await TransactionModel.find(query);

		// Process data for charts
		const chartData = deposits?.reduce(
			(
				acc: Array<{ date: string; amount: number; count: number }>,
				deposit: { createdAt: Date; amount: number }
			) => {
				const date = new Date(deposit.createdAt).toLocaleDateString();
				const existing = acc.find((item) => item.date === date);

				if (existing) {
					existing.amount += deposit.amount;
					existing.count += 1;
				} else {
					acc.push({ date, amount: deposit.amount, count: 1 });
				}
				return acc;
			},
			[]
		);

		const totalDeposits = deposits?.length || 0;
		const totalAmount =
			deposits?.reduce(
				(sum: number, deposit: { amount: number }) => sum + deposit.amount,
				0
			) || 0;

		const averageDeposit = totalAmount / (totalDeposits || 1);

		const data = { chartData, totalDeposits, totalAmount, averageDeposit };

		return Response.json(data);
	} catch (error) {
		const message = handleError(error);
		console.log(message);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(getDepositsAnalytics);
