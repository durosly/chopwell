import { auth } from "@/auth";
import pusherServer from "@/lib/pusher-server";

export async function POST(request: Request) {
	const formData = await request.formData();
	const socket_id = formData.get("socket_id") as string;
	const channel_name = formData.get("channel_name") as string;
	const session = await auth();

	if (!session?.user) {
		return Response.json({ error: "Unauthorized" }, { status: 403 });
	}

	const channelId = channel_name.split("-")[2];

	if (!channelId) {
		return Response.json({ error: "Invalid channel name" }, { status: 403 });
	}

	if (channelId !== "admin" && channelId !== session.user.id) {
		return Response.json({ error: "Unauthorized" }, { status: 403 });
	}

	if (!session.user.id) {
		return Response.json({ error: "User ID is required" }, { status: 403 });
	}

	if (channelId === "admin" && session.user.type !== "admin") {
		return Response.json({ error: "Unauthorized Admin" }, { status: 403 });
	}

	const authResponse = pusherServer.authorizeChannel(socket_id, channel_name);

	return Response.json(authResponse);
}
