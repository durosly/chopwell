import mongoose from "mongoose";
import UserModel from "./user";
import RegionModel from "./region";

const addressSchema = new mongoose.Schema(
	{
		_userId: { type: mongoose.Types.ObjectId, ref: UserModel },
		location: String,
		landmark: String,
		_regionId: { type: mongoose.Types.ObjectId, ref: RegionModel },
	},
	{ timestamps: true }
);

const AddressModel = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default AddressModel;
