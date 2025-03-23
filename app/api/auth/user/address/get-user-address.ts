import { auth } from "@/auth";
import { handleError } from "@/lib/handleError";
import AddressModel from "@/models/address";

async function getUserAddress() {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		// if (!userId) {
		// 	return Response.json({ message: "Unauthorized" }, { status: 401 });
		// }
		const address = await AddressModel.findOne({ _userId: userId });
		if (!address) {
			return Response.json({ message: "No address found", address: [] });
		}

		return Response.json({ message: "Address found", address });
	} catch (error) {
		console.error(error);
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default getUserAddress;
