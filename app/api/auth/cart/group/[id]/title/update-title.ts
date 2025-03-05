import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CartModel from "@/models/cart";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import { Filter } from "bad-words";

type Params = Promise<{ id: string }>;

async function updateCartTitle(req: Request, { params }: { params: Params }) {
	try {
		await connectMongo();

		const id = (await params).id;
		const { title } = await req.json();

		if (!title) {
			return Response.json({ message: "Title is required" }, { status: 400 });
		}

		// title should not be more than 50 characters
		if (title.length > 50) {
			return Response.json(
				{ message: "Title should not be more than 50 characters" },
				{ status: 400 }
			);
		}

		// ensure that title only contains alphanumeric characters, spaces, and hyphens using regex
		if (!/^[a-zA-Z0-9\s-]+$/.test(title)) {
			return Response.json(
				{
					message: "Title should only contain alphanumeric characters, spaces, and hyphens",
				},
				{ status: 400 }
			);
		}

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

		// remove foul language from title
		const titleFilter = new Filter();
		const cleanTitle = titleFilter.clean(title.trim());

		const filter = userId ? { userId } : { sessionId };

		// find the cart belonging to the user and update the cart group title with the id
		const cart = await CartModel.findOneAndUpdate(
			{ ...filter, "group._id": id },
			{ $set: { "group.$.title": cleanTitle } },
			{ new: true }
		);

		return Response.json({ data: cart, message: "Cart title updated" });
	} catch (error) {
		const message = handleError(error);
		console.error(message);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default updateCartTitle;
