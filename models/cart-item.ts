import mongoose from "mongoose";
import FoodModel from "./food";
import CartModel from "./cart";
import CartItemGroupModel from "./cart-item-group";

const CartItemSchema = new mongoose.Schema(
	{
		foodId: { type: mongoose.Schema.Types.ObjectId, ref: FoodModel, required: true },
		quantity: { type: Number, default: 1 },
		groupId: { type: mongoose.Schema.Types.ObjectId, ref: CartItemGroupModel }, // Link to a group
		cartId: { type: mongoose.Schema.Types.ObjectId, ref: CartModel }, // For easy back-reference
	},
	{ timestamps: true }
);

const CartItemModel = mongoose.models?.CartItem || mongoose.model("CartItem", CartItemSchema);

export default CartItemModel;
