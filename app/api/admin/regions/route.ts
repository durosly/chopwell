import RegionModel from "@/models/region";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";

export async function GET() {
	try {
		await connectMongo();
		const regions = await RegionModel.find({}).sort({ createdAt: -1 });
		return Response.json(regions);
	} catch (error) {
		const message = handleError(error);
		return Response.json({ error: message }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		await connectMongo();
		const body = await request.json();
		const region = await RegionModel.create(body);
		return Response.json(region);
	} catch (error) {
		const message = handleError(error);
		return Response.json({ error: message }, { status: 500 });
	}
}
