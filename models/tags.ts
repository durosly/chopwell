import mongoose from "mongoose";
import UserModel from "./user";

const tagsSchema = new mongoose.Schema(
	{
		_creatorId: { type: mongoose.Types.ObjectId, ref: UserModel },
		title: String,
		emoji: String,
	},
	{ timestamps: true }
);

const TagsModel = mongoose.models.Tags || mongoose.model("Tags", tagsSchema);

export default TagsModel;
