import { handleError } from "@/lib/handleError";
import connectMongo from "@/lib/connectMongo";
import { NextRequest } from "next/server";
import OrderModel from "@/models/order";
import { withAdminAuth } from "@/utils/with-admin-auth";

async function getOrders(request: NextRequest) {
	try {
		const { searchParams } = request.nextUrl;
		const search = searchParams.get("search") || "";
		const status = searchParams.get("status") || "";
		const dateFrom = searchParams.get("dateFrom") || "";
		const dateTo = searchParams.get("dateTo") || "";
		const page = Number(searchParams.get("page")) || 1;

		await connectMongo();

		const query: {
			$or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
			status?: string;
			createdAt?: { $gte?: Date; $lte?: Date };
		} = {};

		if (search) {
			query.$or = [
				{ code: { $regex: search, $options: "i" } },
				{ _userId: { $regex: search, $options: "i" } },
			];
		}

		if (status && status !== "all") {
			query.status = status;
		}

		if (dateFrom && dateTo) {
			query.createdAt = {
				$gte: new Date(dateFrom + "T00:00:00.000Z"),
				$lte: new Date(dateTo + "T23:59:59.999Z"),
			};
		} else if (dateFrom) {
			query.createdAt = {
				$gte: new Date(dateFrom + "T00:00:00.000Z"),
			};
		} else if (dateTo) {
			query.createdAt = {
				$lte: new Date(dateTo + "T23:59:59.999Z"),
			};
		}

		const orders = await OrderModel.paginate(query, {
			page,
			limit: 10,
			sort: { createdAt: -1 },
			populate: { path: "_userId", select: "firstname lastname" },
		});

		return Response.json({ orders });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(getOrders);
