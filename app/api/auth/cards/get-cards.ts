import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import CardModel from "@/models/card";

async function getUserSavedCards() {
	try {
		await connectMongo();
		const session = await auth();
		const userId = session?.user.id;
		const data = await CardModel.find({ userId }).lean();

		// const data = [
		// 	{
		// 		_id: "1",
		// 		cardName: "John Doe",
		// 		cardNumber: "**** **** **** 1234",
		// 		cardType: "Visa",
		// 		expiryDate: "12/22",
		// 		cvc: "***",
		// 	},
		// 	{
		// 		_id: "2",
		// 		cardName: "John Doe",
		// 		cardNumber: "**** **** **** 5678",
		// 		cardType: "MasterCard",
		// 		expiryDate: "12/22",
		// 		cvc: "***",
		// 	},
		// ];

		if (!data.length) {
			return Response.json({ message: "No card found. Please, add new card." }, { status: 404 });
		}

		return Response.json({ message: "Cards found", cards: data });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message, status: false }, { status: 500 });
	}
}

export default getUserSavedCards;
