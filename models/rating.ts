import mongoose from "mongoose";
import FoodModel from "./food";
import OrderModel from "./order";

const ratingSchema = new mongoose.Schema(
	{
		_productId: { type: mongoose.Types.ObjectId, ref: FoodModel },
		_orderId: { type: mongoose.Types.ObjectId, ref: OrderModel },
		rating: {
			count: Number,
			remark: {
				msg: String,
				createdAt: { type: Date, default: Date.now },
			},
			reply: {
				msg: String,
				createdAt: { type: Date, default: Date.now },
			},
		},
	},
	{ timestamps: true }
);

const RatingModel = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

export default RatingModel;
