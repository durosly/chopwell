import { NextRequest } from "next/server";
import { handleError } from "@/lib/handleError";
import UserModel from "@/models/user";
import connectMongo from "@/lib/connectMongo";
import { withAdminAuth } from "@/utils/with-admin-auth";

async function getUsers(request: NextRequest) {
	try {
		await connectMongo();

		const searchParams = request.nextUrl.searchParams;
		const page = parseInt(searchParams.get("page") || "1");
		const query = searchParams.get("query") || "";
		const limit = 10;

		const searchQuery = {
			type: "customer",
			...(query
				? {
						$or: [
							{
								firstname: {
									$regex: query,
									$options: "i",
								},
							},
							{
								lastname: {
									$regex: query,
									$options: "i",
								},
							},
							{ email: { $regex: query, $options: "i" } },
						],
					}
				: {}),
		};

		const result = await UserModel.paginate(searchQuery, {
			page,
			limit,
			sort: { createdAt: -1 },
			select: "-password",
		});

		return Response.json(result);
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(getUsers);
