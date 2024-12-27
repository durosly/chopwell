import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
	{
		name: String,
		_creatorId: mongoose.Types.ObjectId,
	},
	{ timestamps: true }
);

const CategoryModel = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default CategoryModel;
