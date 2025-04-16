import mongoose, { Document, PaginateModel, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import CategoryModel from "./category";
import UserModel from "./user";
import TagsModel from "./tags";
import SubCategoryModel from "./sub-category";
import slugify from "slugify";

const foodSchema = new mongoose.Schema(
	{
		name: String,
		_categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: CategoryModel }],
		_subCategoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: SubCategoryModel }],
		image: { type: String, default: "" },
		available: { type: Boolean, default: false },
		price: Number,
		short_desc: String,
		full_desc: String,
		number_of_item: { type: Number, default: 0 },
		_creatorId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
		timeChoice: {
			type: String,
			enum: ["breakfast", "lunch", "dinner"],
			default: "breakfast",
		},
		type: { type: String, enum: ["food", "drink", "combo"], default: "food" },
		average_rating: { type: Number, default: 0 },
		preparation_time: { type: Number, default: 1 }, // in minutes
		_tagIds: [{ type: mongoose.Schema.Types.ObjectId, ref: TagsModel }],
		unit: { type: String, default: "piece" }, // TODO: set food unit when uploading and display unit where it's required
		slug: { type: String, trim: true, unique: true },
	},
	{ timestamps: true }
);

// Pre-save middleware to generate and validate slug
foodSchema.pre<FoodDocument>("save", async function (next) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const food = this;
	// only hash the password if it has been modified (or is new)

	if (!food.isModified("name")) return next();
	let slug = slugify(food.name, { lower: true, strict: true });
	// generate a salt
	let slugExists = true;
	let counter = 1;
	while (slugExists) {
		// @ts-expect-error: use constructor to find the food
		const existingFood = await this.constructor.findOne({ slug });
		if (!existingFood || existingFood._id.equals(this._id)) {
			// If no other article found with the same slug or the found article is the current one being saved
			slugExists = false;
		} else {
			// Generate a new slug with a unique identifier
			counter++;
			slug = `${slugify(food.name, { lower: true, strict: true })}-${counter}`;
		}
	}

	this.slug = slug;
});

// Apply pagination plugin
foodSchema.plugin(mongoosePaginate);

// Define TypeScript interfaces for the schema
export interface FoodData {
	name: string;
	_categoryIds: Types.ObjectId[] | { _id: string; name: string; slug: string }[];
	_subCategoryIds: Types.ObjectId[] | { _id: string; name: string; slug: string }[];
	image: string;
	available: boolean;
	price: number;
	short_desc: string;
	full_desc: string;
	number_of_item: number;
	_creatorId: Types.ObjectId | { _id: string; firstname: string; lastname: string };
	timeChoice: "breakfast" | "lunch" | "dinner";
	type: "food" | "drink" | "combo";
	average_rating: number;
	preparation_time: number;
	_tagIds:
		| Types.ObjectId[]
		| { _id: string; _creatorId: string; title: string; emoji: string }[];
	slug: string;
}

export interface FoodDocument extends Document, FoodData {
	createdAt: Date;
	updatedAt: Date;
}

// Define the model with pagination support
const FoodModel: PaginateModel<FoodDocument> =
	(mongoose.models?.Food as PaginateModel<FoodDocument>) ||
	mongoose.model<FoodDocument, PaginateModel<FoodDocument>>("Food", foodSchema);

export default FoodModel;

export { foodSchema };
