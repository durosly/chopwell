import mongoose from "mongoose";
import UserModel from "./user";

const categorySchema = new mongoose.Schema(
	{
		name: String,
		_creatorId: { type: mongoose.Types.ObjectId, ref: UserModel },
	},
	{ timestamps: true }
);

const CategoryModel = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default CategoryModel;
