"use server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/user";

export async function getUserByEmail(email: string) {
	await connectMongo();

	const user = await UserModel.findOne({ email });

	return user;
}
