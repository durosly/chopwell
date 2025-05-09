import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import TransactionModel from "@/models/transactions";
import UserModel from "@/models/user";
import axios from "axios";
import { withAuth } from "@/utils/with-user-auth";

async function initializeTransaction(request: Request) {
	try {
		const { amount } = await request.json();

		if (!Number(amount))
			return Response.json({ message: "Invalid entry" }, { status: 400 });

		if (Number(amount) < 500)
			return Response.json(
				{ message: "Minimum deposit is N500" },
				{ status: 401 }
			);
		if (Number(amount) > 100_000)
			return Response.json(
				{ message: "Maximum deposit is N100,000" },
				{ status: 401 }
			);

		const session = await auth();
		const userId = session?.user.id;
		await connectMongo();

		const user = await UserModel.findById(userId);

		if (!user) {
			return Response.json({ message: "User not found" }, { status: 404 });
		}

		const newTransaction = await TransactionModel.create({
			amount,
			_userId: userId,
			description: "Fund account",
			type: "deposit",
		});

		const response = await axios.post(
			"https://api.paystack.co/transaction/initialize",
			{
				amount: amount * 100, // Paystack expects amount in kobo
				email: user.email || `${user.firstname}@chopwell.com`,
				reference: newTransaction.id,
				metadata: {
					transaction_id: newTransaction.id,
					custom_fields: [
						{
							display_name: "Customer Name",
							variable_name: "customer_name",
							value: session?.user.name,
						},
						{
							display_name: "Phone Number",
							variable_name: "phone_number",
							value: user.phone || "Not provided",
						},
					],
				},
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
					"Content-Type": "application/json",
				},
			}
		);

		return Response.json(response.data);
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(initializeTransaction);
