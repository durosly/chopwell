import { auth } from "@/auth";
import { handleError } from "@/lib/handleError";
import WalletModel from "@/models/wallet";

async function getUserBalance() {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return Response.json({ message: "Unauthorized" }, { status: 401 });
		}
		const wallet = await WalletModel.findOne({ _userId: userId });
		if (!wallet) {
			return Response.json({ message: "No balance", balance: 0 });
		}

		return Response.json({ balance: wallet.balance });
	} catch (error) {
		console.error(error);
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default getUserBalance;
