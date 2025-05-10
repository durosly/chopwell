import { NextRequest, NextResponse } from "next/server";

import connectMongo from "@/lib/connectMongo";
import TransactionModel from "@/models/transactions";

interface Filter {
	status?: string;
	type?: string;
	createdAt?: {
		$gte?: Date;
		$lte?: Date;
	};
}

export async function GET(request: NextRequest) {
	try {
		await connectMongo();

		const searchParams = request.nextUrl.searchParams;
		const status = searchParams.get("status");
		const type = searchParams.get("type");
		const startDate = searchParams.get("startDate");
		const endDate = searchParams.get("endDate");

		// Build filter object
		const filter: Filter = {};

		if (status) filter.status = status;
		if (type) filter.type = type;

		if (startDate || endDate) {
			filter.createdAt = {};
			if (startDate) filter.createdAt.$gte = new Date(startDate);
			if (endDate) filter.createdAt.$lte = new Date(endDate);
		}

		const transactions = await TransactionModel.find(filter)
			.sort({ createdAt: -1 })
			.lean();

		return NextResponse.json(transactions);
	} catch (error) {
		console.error("Error fetching transactions:", error);
		return NextResponse.json(
			{ error: "Failed to fetch transactions" },
			{ status: 500 }
		);
	}
}
