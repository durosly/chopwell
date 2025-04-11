import mongoose from "mongoose";
import UserModel from "./user";

const notificationSchema = new mongoose.Schema(
	{
		_userId: { type: mongoose.Types.ObjectId, ref: UserModel },
		title: String,
		description: String,
		link: String,
		linkDescription: String,
		isRead: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const NotificationModel =
	mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default NotificationModel;
