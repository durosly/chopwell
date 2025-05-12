import AddressModel from "@/models/address";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";

export async function GET() {
	try {
		await connectMongo();
		const addressCounts = await AddressModel.aggregate([
			{
				$group: {
					_id: "$_regionId",
					count: { $sum: 1 },
				},
			},
			{
				$lookup: {
					from: "regions",
					localField: "_id",
					foreignField: "_id",
					as: "region",
				},
			},
			{
				$unwind: "$region",
			},
			{
				$project: {
					_id: 1,
					count: 1,
					title: "$region.title",
				},
			},
		]);

		return Response.json(addressCounts);
	} catch (error) {
		const message = handleError(error);
		return Response.json({ error: message }, { status: 500 });
	}
}
