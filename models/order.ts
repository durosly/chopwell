import mongoose from "mongoose";
import UserModel from "./user";
import FoodModel from "./food";

const orderSchema = new mongoose.Schema(
	{
		_userId: { type: mongoose.Types.ObjectId, ref: UserModel },
		code: { type: String, default: "DS12345" },
		method_of_delivery: {
			type: String,
			enum: ["delivery", "pickup"],
			default: "pickup",
		},
		// method_of_payment: {
		// 	type: String,
		// 	enum: ["card", "wallet", "virtual-account", "pay-for-me"],
		// 	default: "wallet",
		// },
		status: {
			type: String,
			enum: ["pending", "preparing", "delivering", "successful"],
			default: "pending",
		},
		payment_status: { type: Boolean, default: false },
		products: [
			{
				_productId: { type: mongoose.Types.ObjectId, ref: FoodModel },
				price: String,
				quantity: Number,
				hasReview: { type: Boolean, default: false },
			},
		],
		totalPrice: Number,
		seen: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;
