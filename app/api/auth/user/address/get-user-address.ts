import { auth } from "@/auth";
import { handleError } from "@/lib/handleError";
import AddressModel from "@/models/address";
import { withAuth } from "@/utils/with-user-auth";

async function getUserAddress() {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return Response.json({ message: "Unauthorized" }, { status: 401 });
		}
		const addresses = await AddressModel.find({ _userId: userId }).populate(
			"_regionId"
		);
		if (!addresses.length) {
			return Response.json({ message: "No address found", address: [] });
		}

		// Extract required fields
		const formattedAddresses = addresses.map((address) => ({
			_id: address._id,
			landmark: address.landmark,
			location: address.location,
			region: address._regionId._id, // Store only the region ID
			deliveryPrice: address._regionId.deliveryPrice,
			title: address._regionId.title,
		}));

		return Response.json({ message: "Address found", address: formattedAddresses });
	} catch (error) {
		console.error(error);
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(getUserAddress);
