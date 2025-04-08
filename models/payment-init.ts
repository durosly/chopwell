import mongoose from "mongoose";

const paymentIntentSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
		orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
		method: {
			type: String,
			enum: ["card", "wallet", "virtual-account", "pay-for-me"],
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "requires_action", "success", "failed"],
			default: "pending",
		},
		amount: { type: Number, required: true },
		metadata: { type: mongoose.Schema.Types.Mixed }, // for storing gateway-specific data
		otpRequired: { type: Boolean, default: false },
		publicId: { type: String }, // for generate-link method
	},
	{ timestamps: true }
);

export default mongoose.models.PaymentIntent ||
	mongoose.model("PaymentIntent", paymentIntentSchema);
