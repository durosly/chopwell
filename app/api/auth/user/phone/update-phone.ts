import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import UserModel from "@/models/user";
import { z } from "zod";
import { phone } from "phone";

async function updateUserPhone(request: Request) {
	try {
		const { phone: phonenumber } = await request.json();

		const session = await auth();
		const userId = session?.user.id;

		if (!userId) return Response.json({ message: "Unathorized" }, { status: 401 });
		const validation = phone(phonenumber, { country: "NGA" });
		if (!validation.isValid)
			return Response.json(
				{ message: "Invalid number entered" },
				{ status: 400 }
			);
		await connectMongo();
		await UserModel.findByIdAndUpdate(userId, {
			phone: validation.phoneNumber,
		});

		return Response.json({ message: "Phonenumber updated successfully" });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return Response.json({ message: error.errors[0].message }, { status: 400 });
		}
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default updateUserPhone;
