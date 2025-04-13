import { handleError } from "@/lib/handleError";

async function reorder(_: Request, { params }: { params: Promise<{ orderId: string }> }) {
	try {
		const { orderId } = await params;

		return Response.json({ message: "Reordered successfully", order: "nice" });
	} catch (error) {
		const message = handleError(error);
		return Response.json(message, { status: 500 });
	}
}

export default reorder;
