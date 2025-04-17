import { auth } from "@/auth";
import { handleError } from "@/lib/handleError";
import AddressModel from "@/models/address";
import { withAuth } from "@/utils/with-user-auth";

async function deleteUserAddress(
	_: Request,
	{ params }: { params: Promise<{ addressId: string }> }
) {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return Response.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { addressId } = await params;

		await AddressModel.findOneAndDelete({ _userId: userId, _id: addressId });

		return Response.json({ message: "Address deleted" });
	} catch (error) {
		console.error(error);
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(deleteUserAddress);
