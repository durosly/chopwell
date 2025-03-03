import mongoose from "mongoose";
import UserModel from "./user";
import FoodModel from "./food";

const PromoItemSchema = new mongoose.Schema({
	foodId: { type: mongoose.Schema.Types.ObjectId, ref: FoodModel, required: true },
	precentageDiscount: { type: Number, default: 10, min: 0, max: 100 },
});

const PromoSchema = new mongoose.Schema(
	{
		_creatorId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel, default: null },
		title: { type: String },
		items: [PromoItemSchema],
		coverImage: { type: String, trim: true },
		coverImagePlaceholder: {
			type: String,
			default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/6Fqk2YAAAAASUVORK5CYII=",
		},
		startDate: { type: Date, default: Date.now },
		endDate: { type: Date, default: Date.now },
		promoCode: { type: String, default: null },
		description: { type: String, default: null },
		position: {
			type: String,
			enum: ["slider", "banner", "normal", "hidden"],
			default: "normal",
		},
		style: {
			type: String,
			enum: ["grid", "slider", "banner"],
			default: "grid",
		},
	},
	{ timestamps: true }
);

const PromoModel = mongoose.models.Promo || mongoose.model("Promo", PromoSchema);

export default PromoModel;
