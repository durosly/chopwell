import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/user";

const dummyUsers = [
	{
		firstname: "Admin",
		lastname: "User",
		email: "admin@example.com",
		password: "$2a$10$4Jth5oV5413Uz0dVOUGHWesUr08ZIX1P.F8VFBVlfDDOC4MzGZv1O",
		phone: "1234567890",
		is_admin: true,
		type: "admin",
		auth_method: "auth",
	},
	{
		firstname: "John",
		lastname: "Doe",
		email: "john.doe@example.com",
		password: "$2a$10$4Jth5oV5413Uz0dVOUGHWesUr08ZIX1P.F8VFBVlfDDOC4MzGZv1O",
		phone: "0987654321",
		is_admin: false,
		type: "customer",
		auth_method: "auth",
	},
	{
		firstname: "Jane",
		lastname: "Smith",
		email: "jane.smith@example.com",
		password: "$2a$10$4Jth5oV5413Uz0dVOUGHWesUr08ZIX1P.F8VFBVlfDDOC4MzGZv1O",
		phone: "1122334455",
		is_admin: true,
		type: "employee",
		auth_method: "auth",
	},
];

async function createMockAdminAccount() {
	try {
		await connectMongo();

		await UserModel.deleteMany({});

		await UserModel.insertMany(dummyUsers);

		return Response.json({ message: "New users inserted" });
	} catch (error: unknown) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}

		return Response.json({ message }, { status: 500 });
	}
}

export { createMockAdminAccount as GET, createMockAdminAccount as POST };
