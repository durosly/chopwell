import mongoose, { PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import UserModel from "./user";
import FoodModel, { FoodDocument } from "./food";

const favoriteSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel, default: null },
	sessionId: { type: String },
	items: [{ type: mongoose.Schema.Types.ObjectId, ref: FoodModel }],
});

// Apply pagination plugin
favoriteSchema.plugin(mongoosePaginate);

export interface FavouriteData {
	userId: string;
	sessionId: string;
	items: string[] | FoodDocument[];
}

// Define the model with pagination support
const FavouriteModel: PaginateModel<FavouriteData> =
	(mongoose.models.Favorite as PaginateModel<FavouriteData>) ||
	mongoose.model<FavouriteData, PaginateModel<FavouriteData>>("Favorite", favoriteSchema);

export default FavouriteModel;

//   export default mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
