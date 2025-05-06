import mongoose, { PaginateModel } from "mongoose";
import bcrypt from "bcryptjs";
import mongoosePaginate from "mongoose-paginate-v2";
const userSchema = new mongoose.Schema(
	{
		firstname: String,
		lastname: String,
		email: String,
		password: String,
		phone: String,
		is_admin: { type: Boolean, default: false },
		emailVerifed: { type: Date, default: null },
		phoneVerified: { type: Date, default: null },
		type: {
			type: String,
			enum: ["admin", "customer", "employee"],
			default: "customer",
		},
		auth_method: { type: String, enum: ["auth", "google-auth"], default: "auth" },
		disabled: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

userSchema.plugin(mongoosePaginate);

// userSchema.plugin(bcrypt())
userSchema.pre("save", function (next) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const user = this;

	if (!user.isModified("password")) return next();

	// generate a salt
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(user.password!, salt, function (err, hash) {
			if (err) return next(err);
			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

export interface UserData {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	phone: string;
	is_admin: boolean;
	emailVerifed: Date;
	phoneVerified: Date;
	type: "admin" | "customer" | "employee";
	auth_method: "auth" | "google-auth";
	disabled: boolean;
}

export interface UserDocument extends Document, UserData {
	createdAt: Date;
	updatedAt: Date;
}

// Define the model with pagination support
const UserModel: PaginateModel<UserDocument> =
	(mongoose.models?.User as PaginateModel<UserDocument>) ||
	mongoose.model<UserDocument, PaginateModel<UserDocument>>("User", userSchema);

export default UserModel;
