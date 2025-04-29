import mongoose, { Schema, Types, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import UserModel from "./user";
import slugify from "slugify";

// Define the schema
const categorySchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		_creatorId: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
		cover_image: { type: String, trim: true },
		coverImagePlaceholder: {
			type: String,
			default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/6Fqk2YAAAAASUVORK5CYII=",
		},
		slug: { type: String, trim: true, unique: true },
	},
	{ timestamps: true }
);

// Pre-save middleware to generate and validate slug
categorySchema.pre<CategoryDocument>("save", async function (next) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const category = this;
	// only hash the password if it has been modified (or is new)

	if (!category.isModified("name")) return next();
	let slug = slugify(category.name, { lower: true, strict: true });
	// generate a salt
	let slugExists = true;
	let counter = 1;
	while (slugExists) {
		// @ts-expect-error: use constructor to find the food
		const existingCategory = await this.constructor.findOne({ slug });
		if (!existingCategory || existingCategory._id.equals(this._id)) {
			// If no other article found with the same slug or the found article is the current one being saved
			slugExists = false;
		} else {
			// Generate a new slug with a unique identifier
			counter++;
			slug = `${slugify(category.name, { lower: true, strict: true })}-${counter}`;
		}
	}

	this.slug = slug as string;
});

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
	slug: string;
}

export interface CategoryDocument extends Document, CategoryData {
	createdAt: Date;
	updatedAt: Date;
}

// Define the model with pagination support
const CategoryModel: PaginateModel<CategoryDocument> =
	(mongoose.models?.Category as PaginateModel<CategoryDocument>) ||
	mongoose.model<CategoryDocument, PaginateModel<CategoryDocument>>(
		"Category",
		categorySchema
	);

export default CategoryModel;

export { categorySchema };
