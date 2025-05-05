import mongoose, { Document, PaginateModel, Types } from "mongoose";
import { customAlphabet } from "nanoid";
import UserModel from "./user";
import FoodModel from "./food";
import AddressModel from "./address";
import mongoosePaginate from "mongoose-paginate-v2";

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
			enum: ["pending", "preparing", "delivering", "successful", "cancelled"],
			default: "pending",
		},
		payment_status: { type: Boolean, default: false },
		products: [
			{
				_productId: { type: mongoose.Types.ObjectId, ref: FoodModel },
				price: String,
				quantity: Number,
				hasReview: { type: Boolean, default: false },
				label: String,
			},
		],
		_addressId: { type: mongoose.Types.ObjectId, ref: AddressModel },
		totalPrice: Number,
		deliveryPrice: Number,
		seen: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

// Create a generator with uppercase, lowercase, and numbers
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateCode = customAlphabet(alphabet, 8);

// Apply pagination plugin
orderSchema.plugin(mongoosePaginate);

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

// Define TypeScript interfaces for the schema
export interface OrderData {
	_userId: Types.ObjectId | { _id: string; firstname: string; lastname: string };
	code: string;
	method_of_delivery: "delivery" | "pickup";
	status: "pending" | "preparing" | "delivering" | "successful";
	payment_status: boolean;
	products: {
		_productId: Types.ObjectId | { _id: string; name: string; price: number };
		price: string;
		quantity: number;
		hasReview: boolean;
		label: string;
	};
	_addressId:
		| Types.ObjectId
		| {
				_id: string;
				address: string;
				city: string;
				state: string;
				zip: string;
				country: string;
		  };
	totalPrice: number;
	deliveryPrice: number;
	seen: boolean;
}

export interface OrderDocument extends Document, OrderData {
	createdAt: Date;
	updatedAt: Date;
}

// Define the model with pagination support
const OrderModel: PaginateModel<OrderDocument> =
	(mongoose.models?.Order as PaginateModel<OrderDocument>) ||
	mongoose.model<OrderDocument, PaginateModel<OrderDocument>>("Order", orderSchema);

// const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default OrderModel;
