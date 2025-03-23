import connectMongo from "@/lib/connectMongo";
import RegionModel from "@/models/region";
import UserModel from "@/models/user";

const dummyRegions = [
	{
		title: "Boys Hostel A",
		deliveryPrice: 0,
	},
	{
		title: "Boys Hostel B",
		deliveryPrice: 0,
	},
	{
		title: "Ugbomro Girls Hostel",
		deliveryPrice: 10,
	},
	{
		title: "Iterigbe",
		deliveryPrice: 20,
	},
];

async function createMockRegions() {
	try {
		await connectMongo();
		const admin = await UserModel.findOne({ type: "admin" });
		const _creatorId = admin?._id || null;

		await RegionModel.deleteMany({});
		const regions = dummyRegions.map((region) => ({ ...region, _creatorId }));

		await RegionModel.insertMany(regions);

		return Response.json({ message: "New regions inserted" });
	} catch (error: unknown) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}

		return Response.json({ message }, { status: 500 });
	}
}

export { createMockRegions as GET, createMockRegions as POST };
