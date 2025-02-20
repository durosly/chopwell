import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import FavouriteModel from "@/models/favourite";
import { NextRequest } from "next/server";

async function getFav(req: NextRequest) {
	try {
		await connectMongo();
		const searchParams = req.nextUrl.searchParams;
		const sessionId = searchParams.get("sessionId");
		const full = searchParams.get("full");
		const session = await auth();
		const userId = session?.user.id;

		const filter = userId ? { userId } : { sessionId };

		const fav = await FavouriteModel.findOne(filter).populate(
			full === "true" ? "items" : ""
		);

		// return empty array as data if no fav found else return fav.items as data
		if (!fav) return Response.json({ data: [] });
		return Response.json({ data: fav.items });
	} catch (error) {
		console.log("Error in add-to-fav", error);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default getFav;
