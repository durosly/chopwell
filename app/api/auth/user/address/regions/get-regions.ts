import { handleError } from "@/lib/handleError";
import RegionModel from "@/models/region";
import { withAuth } from "@/utils/with-user-auth";

async function getAvailableRegions() {
	try {
		const regions = await RegionModel.find({}).select([
			"_id",
			"title",
			"deliveryPrice",
		]);
		if (!regions) {
			return Response.json({ message: "No regions found", regions: [] });
		}

		return Response.json({ message: "Regions found", regions });
	} catch (error) {
		console.error(error);
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(getAvailableRegions);
