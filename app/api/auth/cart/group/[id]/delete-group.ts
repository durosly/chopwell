import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CartModel from "@/models/cart";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";

type Params = Promise<{ id: string }>;

async function deleteGroup(_: Request, { params }: { params: Params }) {
	try {
		await connectMongo();
		const id = (await params).id;

		let sessionId = "";
		const session = await auth();
		const userId = session?.user.id;

		if (!userId) {
			sessionId = await getAnonymousSessionId();
		}

		if (!sessionId && !userId) {
			return Response.json(
				{ message: "Error creating session. Please, log in to continue" },
				{ status: 500 }
			);
		}

		const filter = userId ? { userId } : { sessionId };

		// find the cart belonging to the user and remove the cart group with the id
		const updatedCart = await CartModel.findOneAndUpdate(
			filter,
			{ $pull: { group: { _id: id } } },
			{ new: true } // Returns the updated document
		);

		return Response.json({ message: "Group deleted", data: updatedCart });
	} catch (error) {
		const message = handleError(error);
		console.error(message);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default deleteGroup;
