import mongoose from "mongoose";
import UserModel from "./user";

const regionSchema = new mongoose.Schema(
	{
		_creatorId: { type: mongoose.Types.ObjectId, ref: UserModel },
		title: String,
		deliveryPrice: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const RegionModel = mongoose.models.Region || mongoose.model("Region", regionSchema);

export default RegionModel;
