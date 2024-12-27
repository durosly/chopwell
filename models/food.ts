import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
	{
		name: String,
		_categoryIds: [String],
		images: { type: String, default: "" },
		available: { type: Boolean, default: false },
		price: Number,
		short_summary: String,
		long_summary: String,
		number_of_item: { type: Number, default: 0 },
		soldAlone: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default FoodModel;
