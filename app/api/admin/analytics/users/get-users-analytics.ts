import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import UserModel from "@/models/user";
import { withAdminAuth } from "@/utils/with-admin-auth";
import { NextRequest } from "next/server";

interface User {
	id: string;
	createdAt: string;
}

async function getUsersAnalytics(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const startDate = searchParams.get("dateFrom");
		const endDate = searchParams.get("dateTo");

		await connectMongo();

		const query: { createdAt?: { $gte?: Date; $lte?: Date } } = {};

		if (startDate && endDate) {
			query.createdAt = {
				$gte: new Date(startDate + "T00:00:00.000Z"),
				$lte: new Date(endDate + "T23:59:59.999Z"),
			};
		} else if (startDate) {
			query.createdAt = {
				$gte: new Date(startDate + "T00:00:00.000Z"),
			};
		} else if (endDate) {
			query.createdAt = {
				$lte: new Date(endDate + "T23:59:59.999Z"),
			};
		}

		const users = await UserModel.find(query);

		const usersData = users?.map((user) => ({
			id: user._id.toString(),
			createdAt: user.createdAt.toISOString(),
		}));

		const chartData = usersData?.reduce(
			(acc: Array<{ date: string; newUsers: number }>, user: User) => {
				const date = new Date(user.createdAt).toLocaleDateString();
				const existing = acc.find((item) => item.date === date);

				if (existing) {
					existing.newUsers += 1;
				} else {
					acc.push({ date, newUsers: 1 });
				}
				return acc;
			},
			[]
		);

		const data = {
			totalUsers: users?.length,
			chartData,
		};

		return Response.json(data, { status: 200 });
	} catch (error) {
		const message = handleError(error);
		return Response.json(
			{
				success: false,
				message,
			},
			{ status: 500 }
		);
	}
}

export default withAdminAuth(getUsersAnalytics);
