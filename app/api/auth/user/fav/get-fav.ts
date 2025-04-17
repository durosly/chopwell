import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import FavouriteModel from "@/models/favourite";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import { NextRequest } from "next/server";
import { handleError } from "@/lib/handleError";
import { withAuth } from "@/utils/with-user-auth";

async function getFav(request: Request | NextRequest) {
	try {
		await connectMongo();
		const searchParams =
			request instanceof NextRequest
				? request.nextUrl.searchParams
				: new URL(request.url).searchParams;

		let sessionId = "";
		const full = searchParams.get("full");
		const session = await auth();
		const userId = session?.user.id;

		if (!userId) {
			sessionId = await getAnonymousSessionId();
		}

		const filter = userId ? { userId } : { sessionId };

		const fav = await FavouriteModel.findOne(filter).populate(
			full === "true" ? "items" : ""
		);

		// return empty array as data if no fav found else return fav.items as data
		if (!fav) return Response.json({ data: [] });

		return Response.json({ data: fav.items });
	} catch (error) {
		console.log("Error in add-to-fav", error);
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(getFav);
