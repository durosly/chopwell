import mongoose from "mongoose";
import UserModel from "./user";

const CartSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel, default: null },
		sessionId: { type: String }, // For unauthenticated users
	},
	{ timestamps: true }
);

const CartModel = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default CartModel;
