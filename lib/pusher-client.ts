import Pusher from "pusher-js";

const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
	cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
	channelAuthorization: {
		endpoint: "/api/pusher/auth",
		transport: "ajax",
	},
});

export default pusherClient;
