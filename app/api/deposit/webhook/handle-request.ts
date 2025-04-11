import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import NotificationModel from "@/models/notifications";
import TransactionModel from "@/models/transactions";
import WalletModel from "@/models/wallet";
import commaNumber from "@/utils/comma-number";
import crypto from "crypto";
import { headers } from "next/headers";

async function handleDepositWebhook(request: Request) {
	try {
		const headersList = await headers();
		const body = await request.json();
		const hash = crypto
			.createHmac("sha512", process.env.PAYSTACK_SECRET!)
			.update(JSON.stringify(body))
			.digest("hex");
		const signature = headersList.get("x-paystack-signature");

		if (hash !== signature)
			return Response.json({ message: "Invalid data" }, { status: 400 });

		if (body.event === "charge.success") {
			await connectMongo();
			const transactionId = body.data.reference;
			const transaction = await TransactionModel.findByIdAndUpdate(
				transactionId,
				{
					status: "success",
					description: `Fund account via ${body.data.channel}`,
				}
			);
			const wallet = await WalletModel.findOne({ _userId: transaction._userId });

			if (!wallet) {
				await WalletModel.create({
					_userId: transaction._userId,
					balance: transaction.amount,
				});
			} else {
				wallet.balance += Number(transaction.amount);
				await wallet.save();
			}

			await NotificationModel.create({
				_userId: transaction._userId,
				title: "Deposit successful",
				description: `Your deposit of ${commaNumber(transaction.amount)} is successful✅.`,
				link: "/user/wallet",
				linkDescription: "view balance",
			});

			// TODO: use pusher.js to notify user
		}

		console.log(body);

		return Response.json({ message: "Done" });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default handleDepositWebhook;
