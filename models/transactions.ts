import mongoose from "mongoose";
import UserModel from "./user";

const transactionSchema = new mongoose.Schema(
	{
		_userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel, required: false },

		status: {
			type: String,
			enum: ["pending", "requires_action", "success", "failed"],
			default: "pending",
		},
		type: {
			type: String,
			enum: ["deposit", "purchase", "withdrawal"],
			default: "deposit",
		},
		amount: { type: Number, required: true },
		description: { type: String, default: "Fund Account" },
	},
	{ timestamps: true }
);

const TransactionModel =
	mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
