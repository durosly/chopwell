import mongoose from "mongoose";
import UserModel from "./user";
import FoodModel from "./food";

const CartItemSchema = new mongoose.Schema({
	foodId: { type: mongoose.Schema.Types.ObjectId, ref: FoodModel, required: true },
	quantity: { type: Number, default: 1 },
	// group: { type: String, default: "" }, // Used for grouping items
});
const CartItemGroupSchema = new mongoose.Schema({
	title: { type: String, required: true },
	items: [CartItemSchema],
});

const CartSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel, default: null },
		sessionId: { type: String }, // For unauthenticated users
		group: [CartItemGroupSchema],
	},
	{ timestamps: true }
);

const CartModel = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default CartModel;
