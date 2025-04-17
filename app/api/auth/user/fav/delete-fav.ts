import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import FavouriteModel from "@/models/favourite";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import { handleError } from "@/lib/handleError";
import { withAuth } from "@/utils/with-user-auth";

async function removeFromFav(req: Request) {
	try {
		await connectMongo();

		const { foodId } = await req.json();
		const session = await auth();
		const userId = session?.user.id;
		let sessionId = "";
		if (!userId) {
			sessionId = await getAnonymousSessionId();
		}

		const filter = userId ? { userId } : { sessionId };

		const fav = await FavouriteModel.findOne(filter);

		if (fav) {
			// remove foodId from fav item list
			// @ts-expect-error: items is an array of ObjectIds
			fav.items = fav.items.filter((item) => item.toString() !== foodId);
			await fav.save();
		}

		return Response.json({ message: "Food item removed from favourite" });
	} catch (error) {
		console.log("Error in add-to-fav", error);
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(removeFromFav);
