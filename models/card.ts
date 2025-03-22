import mongoose from "mongoose";
import UserModel from "./user";

const CardSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
		cardName: { type: String },
		cardNumber: { type: String },
		cardType: { type: String },
		expiryDate: { type: String },
		cvc: { type: String },
	},
	{ timestamps: true }
);

const CardModel = mongoose.models.Card || mongoose.model("Card", CardSchema);

export default CardModel;
