import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import UserModel from "./user";
import FoodModel from "./food";

const orderSchema = new mongoose.Schema(
	{
		_userId: { type: mongoose.Types.ObjectId, ref: UserModel },
		code: { type: String, unique: true },
		method_of_delivery: {
			type: String,
			enum: ["delivery", "pickup"],
			default: "pickup",
		},
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

// Create a generator with uppercase, lowercase, and numbers
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateCode = customAlphabet(alphabet, 8);

// Pre-save hook to set unique code
orderSchema.pre("save", async function (next) {
	if (this.isNew && !this.code) {
		let code;
		let exists = true;

		while (exists) {
			code = generateCode();
			exists = !!(await mongoose.models.Order.exists({ code }));
		}

		this.code = code;
	}

	next();
});

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default OrderModel;
