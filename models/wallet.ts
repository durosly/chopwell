import mongoose from "mongoose";
import UserModel from "./user";

const WalletSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
		balance: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const WalletModel = mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);

export default WalletModel;
