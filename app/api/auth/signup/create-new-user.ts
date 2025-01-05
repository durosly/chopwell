import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/user";
import { signupSchema } from "@/types/signup";

async function createNewUser(req: Request): Promise<Response> {
	try {
		// Connect to MongoDB
		await connectMongo();

		// Parse and validate the request body
		const body = await req.json();
		const validation = signupSchema.safeParse(body);

		if (!validation.success) {
			return Response.json({ success: false, message: validation.error.errors[0].message }, { status: 400 });
		}

		// Extract relevant data
		const { firstName, lastName, password, processedContact } = validation.data;

		// Check for an existing user by email or phone
		const existingUser = await UserModel.findOne({
			$or: [
				{ email: processedContact.type === "email" ? processedContact.value : null },
				{ phone: processedContact.type === "phone" ? processedContact.value : null },
			].filter((condition) => Object.values(condition)[0] !== null),
		});

		if (existingUser) {
			return Response.json({ success: false, message: "Email or phone number has already been used" }, { status: 409 });
		}

		// Create a new user
		const newUser = await UserModel.create({
			firstname: firstName,
			lastname: lastName,
			password,
			...(processedContact.type === "phone" ? { phone: processedContact.value } : { email: processedContact.value }),
			auth_method: "auth",
		});

		// send otp

		if (processedContact.type === "email") {
			// send email otp
		} else {
			// TODO: send sms otp
		}

		// Return a success response
		return Response.json(
			{
				success: true,
				message: "User registered successfully",
				user: {
					id: newUser._id,
					firstname: newUser.firstname,
					lastname: newUser.lastname,
					email: newUser.email,
					phone: newUser.phone,
				},
			},
			{ status: 201 }
		);
	} catch (error: unknown) {
		// Log the error
		console.error("Error in createNewUser:", error);

		// Return a generic error response
		return Response.json({ success: false, message: "Something went wrong. Please try again later." }, { status: 500 });
	}
}

export default createNewUser;
