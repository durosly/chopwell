import mongoose from "mongoose";
import CartModel from "./cart";

const CartItemGroupSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		cartId: { type: mongoose.Schema.Types.ObjectId, ref: CartModel }, // To identify the parent cart
	},
	{ timestamps: true }
);

const CartItemGroupModel =
	mongoose.models.CartItemGroup || mongoose.model("CartItemGroup", CartItemGroupSchema);

export default CartItemGroupModel;
