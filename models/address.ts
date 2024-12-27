import mongoose from "mongoose";
import UserModel from "./user";

const addressSchema = new mongoose.Schema(
	{
		_userId: { type: mongoose.Types.ObjectId, ref: UserModel },
		location: String,
		landmark: String,
	},
	{ timestamps: true }
);

const AddressModel = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default AddressModel;
