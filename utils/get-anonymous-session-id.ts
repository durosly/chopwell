"use server";

import "server-only";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

async function getAnonymousSessionId({ get }: { get?: boolean } = { get: true }) {
	const anonymousSessionName = "sessionId";
	const cookieStore = await cookies();
	let sessionId = cookieStore.get(anonymousSessionName)?.value;

	if (!sessionId && !get) {
		sessionId = uuidv4();
		cookieStore.set({
			name: anonymousSessionName,
			value: sessionId,
			httpOnly: true,
			path: "/",
			secure: process.env.NODE_ENV === "production",
		});
	}

	if (!sessionId) {
		sessionId = "";
	}

	return sessionId;
}

export default getAnonymousSessionId;
