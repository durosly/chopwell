import mongoose, { Schema, Types, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import UserModel from "./user";
import CategoryModel from "./category";
import slugify from "slugify";
// Define the schema
const subCategorySchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		_creatorId: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
		_categoryId: { type: Schema.Types.ObjectId, ref: CategoryModel, required: true },
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
subCategorySchema.pre<SubCategoryDocument>("save", async function (next) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const subCategory = this;
	// only hash the password if it has been modified (or is new)

	if (!subCategory.isModified("name")) return next();
	let slug = slugify(subCategory.name, { lower: true, strict: true });
	// generate a salt
	let slugExists = true;
	let counter = 1;
	while (slugExists) {
		// @ts-expect-error: use constructor to find the food
		const existingSubCategory = await this.constructor.findOne({ slug });
		if (!existingSubCategory || existingSubCategory._id.equals(this._id)) {
			// If no other article found with the same slug or the found article is the current one being saved
			slugExists = false;
		} else {
			// Generate a new slug with a unique identifier
			counter++;
			slug = `${slugify(subCategory.name, { lower: true, strict: true })}-${counter}`;
		}
	}

	this.slug = slug;
});

// Add the toJSON and toObject transformation options
subCategorySchema.set("toJSON", {
	transform: (doc, ret) => {
		ret._id = ret._id.toString();
		delete ret.__v;
		return ret;
	},
});

subCategorySchema.set("toObject", {
	transform: (doc, ret) => {
		ret._id = ret._id.toString();
		delete ret.__v;
		return ret;
	},
});

// Apply pagination plugin
subCategorySchema.plugin(mongoosePaginate);

// Define TypeScript interfaces for the schema
export interface SubCategoryData {
	name: string;
	_creatorId: Types.ObjectId | { _id: string; firstname: string; lastname: string };
	cover_image: string;
	coverImagePlaceholder: string;
	slug: string;
}

export interface SubCategoryDocument extends Document, SubCategoryData {
	createdAt: Date;
	updatedAt: Date;
}

// Define the model with pagination support
const SubCategoryModel: PaginateModel<SubCategoryDocument> =
	(mongoose.models?.SubCategory as PaginateModel<SubCategoryDocument>) ||
	mongoose.model<SubCategoryDocument, PaginateModel<SubCategoryDocument>>(
		"SubCategory",
		subCategorySchema
	);

export default SubCategoryModel;

export { subCategorySchema as subCategorySchema };
