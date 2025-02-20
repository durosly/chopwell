import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import FavouriteModel from "@/models/favourite";

async function removeFromFav(req: Request) {
	try {
		await connectMongo();

		const { foodId, sessionId } = await req.json();
		const session = await auth();
		const userId = session?.user.id;

		const filter = userId ? { userId } : { sessionId };

		const fav = await FavouriteModel.findOne(filter);

		if (fav) {
			// remove foodId from fav item list
			fav.items = fav.items.filter((item) => item.toString() !== foodId);
			await fav.save();
		}

		return Response.json({ message: "Food item removed from favourite" });
	} catch (error) {
		console.log("Error in add-to-fav", error);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default removeFromFav;
