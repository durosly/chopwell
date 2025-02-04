import mongoose, { Schema, Types, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import UserModel from "./user";

// Define the schema
const categorySchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		_creatorId: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
		cover_image: { type: String, trim: true },
		covertImagePlaceholder: {
			type: String,
			default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/6Fqk2YAAAAASUVORK5CYII=",
		},
	},
	{ timestamps: true }
);

// Add the toJSON and toObject transformation options
categorySchema.set("toJSON", {
	transform: (doc, ret) => {
		ret._id = ret._id.toString();
		delete ret.__v;
		return ret;
	},
});

categorySchema.set("toObject", {
	transform: (doc, ret) => {
		ret._id = ret._id.toString();
		delete ret.__v;
		return ret;
	},
});

// Apply pagination plugin
categorySchema.plugin(mongoosePaginate);

// Define TypeScript interfaces for the schema
export interface CategoryData {
	name: string;
	_creatorId: Types.ObjectId | { _id: string; firstname: string; lastname: string };
	cover_image: string;
	coverImagePlaceholder: string;
}

export interface CategoryDocument extends Document, CategoryData {
	createdAt: Date;
	updatedAt: Date;
}

// Define the model with pagination support
const CategoryModel: PaginateModel<CategoryDocument> =
	(mongoose.models.Category as PaginateModel<CategoryDocument>) ||
	mongoose.model<CategoryDocument, PaginateModel<CategoryDocument>>(
		"Category",
		categorySchema
	);

export default CategoryModel;

export { categorySchema };
