import { v4 as uuidv4 } from "uuid";

function getAnonymousSessionId() {
	if (typeof window === "undefined") return "";

	let sessionId = localStorage.getItem("sessionId");
	if (!sessionId) {
		sessionId = uuidv4();
		localStorage.setItem("sessionId", sessionId);
	}
	return sessionId;
}

export default getAnonymousSessionId;
