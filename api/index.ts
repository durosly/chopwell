import axios from "axios";

export async function getCategories(page: number, query: string, signal: AbortSignal) {
	const response = await axios("/api/admin/categories", { params: { page, query }, signal });
	return response.data;
}

// Favoutite API
export async function addItemToFavourite(
	{ foodId, sessionId }: { foodId: string; sessionId: string },
	signal?: AbortSignal
) {
	const response = await axios.post("/api/auth/fav", { foodId, sessionId }, { signal });
	return response.data;
}
export async function removeItemFromFavourite(
	{ foodId, sessionId }: { foodId: string; sessionId: string },
	signal?: AbortSignal
) {
	const response = await axios.delete("/api/auth/fav", {
		data: { foodId, sessionId },
		signal,
	});
	return response.data;
}

export async function getFavourites(
	{ sessionId, full }: { sessionId: string; full?: boolean },
	signal?: AbortSignal
) {
	const response = await axios("/api/auth/fav", { params: { sessionId, full }, signal });
	return response.data;
}
