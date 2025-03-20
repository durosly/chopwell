"use server";

import "server-only";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

type CookieData = {
	sessionId: string;
	timestamp: number;
};

async function getAnonymousSessionId({ get }: { get?: boolean } = { get: true }) {
	const anonymousSessionName = "sessionId";
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get(anonymousSessionName);
	const stringCookieValue = sessionCookie?.value || "";
	let cookieData: CookieData | undefined;
	try {
		cookieData = JSON.parse(stringCookieValue);
	} catch {
		cookieData = undefined;
	}

	if (!cookieData && !get) {
		const sessionId = uuidv4();
		const currentTime = Date.now();

		cookieStore.set({
			name: anonymousSessionName,
			value: JSON.stringify({ sessionId, timestamp: currentTime }),
			httpOnly: true,
			path: "/",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
		});

		cookieData = { sessionId, timestamp: currentTime };
	}

	// if sessionId is set, check if cookie is older than 5 days then reset it
	if (cookieData) {
		const cookieDate = new Date(cookieData?.timestamp);
		const currentDate = new Date();
		const diff = currentDate.getTime() - cookieDate.getTime();
		const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

		if (diffDays >= 5) {
			const currentTime = Date.now();

			cookieStore.set({
				name: anonymousSessionName,
				value: JSON.stringify({
					sessionId: cookieData.sessionId,
					timestamp: currentTime,
				}),
				httpOnly: true,
				path: "/",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
			});
		}
	}

	if (!cookieData) {
		return "";
	}

	return cookieData.sessionId;
}

export default getAnonymousSessionId;
