import axios from "axios";

export async function getCategories(page: number, query: string, signal: AbortSignal) {
	const response = await axios("/api/admin/categories", { params: { page, query }, signal });
	return response.data;
}

// Favoutite API
export async function addItemToFavourite({ foodId }: { foodId: string }, signal?: AbortSignal) {
	const response = await axios.post("/api/auth/fav", { foodId }, { signal });
	return response.data;
}
export async function removeItemFromFavourite(
	{ foodId }: { foodId: string },
	signal?: AbortSignal
) {
	const response = await axios.delete("/api/auth/fav", {
		data: { foodId },
		signal,
	});
	return response.data;
}

export async function getFavourites({ full }: { full?: boolean }, signal?: AbortSignal) {
	const response = await axios("/api/auth/fav", { params: { full }, signal });
	return response.data;
}

// Cart API
export async function addItemToCart({ foodId }: { foodId: string }, signal?: AbortSignal) {
	const response = await axios.post("/api/auth/cart", { foodId }, { signal });
	return response.data;
}
export async function removeItemFromCart({ foodId }: { foodId: string }, signal?: AbortSignal) {
	const response = await axios.delete("/api/auth/cart", {
		data: { foodId },
		signal,
	});
	return response.data;
}

export async function getCart({ full }: { full?: boolean }, signal?: AbortSignal) {
	const response = await axios("/api/auth/cart", { params: { full }, signal });
	return response.data;
}

export async function getCartIds({ full }: { full?: boolean }, signal?: AbortSignal) {
	const response = await axios("/api/auth/cart/ids", { params: { full }, signal });
	return response.data;
}
