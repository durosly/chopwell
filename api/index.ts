import { handleError } from "@/lib/handleError";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "/api",
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		const message = handleError(error);
		return Promise.reject(message);
	}
);

export async function getCategories(page: number, query: string, signal: AbortSignal) {
	const response = await axiosInstance("/admin/categories", {
		params: { page, query },
		signal,
	});
	return response.data;
}

// Favoutite API
export async function addItemToFavourite({ foodId }: { foodId: string }, signal?: AbortSignal) {
	const response = await axiosInstance.post("/auth/fav", { foodId }, { signal });
	return response.data;
}
export async function removeItemFromFavourite(
	{ foodId }: { foodId: string },
	signal?: AbortSignal
) {
	const response = await axiosInstance.delete("/auth/fav", {
		data: { foodId },
		signal,
	});

	return response.data;
}

export async function getFavourites({ full }: { full?: boolean }, signal?: AbortSignal) {
	const response = await axiosInstance("/auth/fav", { params: { full }, signal });
	return response.data;
}

// Cart API
export async function addItemToCart({ foodId }: { foodId: string }) {
	const response = await axiosInstance.post("/auth/cart", { foodId });
	return response.data;
}
export async function removeItemFromCart({ foodId }: { foodId: string }) {
	const response = await axiosInstance.delete("/auth/cart", {
		data: { foodId },
	});
	return response.data;
}

export async function getCart() {
	const response = await axiosInstance("/auth/cart");
	return response.data;
}

export async function getCartIds({ full }: { full?: boolean }, signal?: AbortSignal) {
	const response = await axiosInstance("/auth/cart/ids", { params: { full }, signal });
	return response.data;
}
