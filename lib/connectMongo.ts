import "server-only";

import mongoose from "mongoose";

const connectMongo = async () => {
	if (mongoose.connection.readyState >= 1) {
		console.log("MongoDB is already connected.");
		return mongoose.connection;
	}

	try {
		const connection = await mongoose.connect(process.env.MONGODB_URL!);
		console.log("MongoDB connected successfully.");
		return connection;
	} catch (error) {
		console.error("MongoDB connection error:", error);
		throw error;
	}
};

export default connectMongo;
