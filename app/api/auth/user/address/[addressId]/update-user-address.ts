import { auth } from "@/auth";
import { handleError } from "@/lib/handleError";
import AddressModel from "@/models/address";
import RegionModel from "@/models/region";
import addAddressSchema from "@/types/add-address";

async function updateUserAddress(
	request: Request,
	{ params }: { params: Promise<{ addressId: string }> }
) {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return Response.json({ message: "Unauthorized" }, { status: 401 });
		}
		const body = await request.json();
		const valid = addAddressSchema.safeParse(body);
		if (!valid.success) {
			return Response.json(
				{ message: valid.error.errors[0].message },
				{ status: 400 }
			);
		}
		const data = valid.data;
		const existingRegion = await RegionModel.findById(data.region);
		if (!existingRegion)
			return Response.json({ message: "Invalid region" }, { status: 401 });

		const { addressId } = await params;

		await AddressModel.findOneAndUpdate(
			{ _userId: userId, _id: addressId },
			{ location: data.address, landmark: data.landmark, _regionId: data.region }
		);

		return Response.json({ message: "Address updated" });
	} catch (error) {
		console.error(error);
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default updateUserAddress;
