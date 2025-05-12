import RegionModel from "@/models/region";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectMongo();
		const { id } = await params;
		const region = await RegionModel.findById(id);
		if (!region) {
			return Response.json({ error: "Region not found" }, { status: 404 });
		}
		return Response.json(region);
	} catch (error) {
		const message = handleError(error);
		return Response.json({ error: message }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectMongo();
		const { id } = await params;
		const body = await request.json();
		const region = await RegionModel.findByIdAndUpdate(id, body, {
			new: true,
		});
		if (!region) {
			return Response.json({ error: "Region not found" }, { status: 404 });
		}
		return Response.json(region);
	} catch (error) {
		const message = handleError(error);
		return Response.json({ error: message }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectMongo();
		const { id } = await params;
		const region = await RegionModel.findByIdAndDelete(id);
		if (!region) {
			return Response.json({ error: "Region not found" }, { status: 404 });
		}
		return Response.json({ message: "Region deleted successfully" });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ error: message }, { status: 500 });
	}
}
