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

export async function removeItemFromFavourite({ foodId }: { foodId: string }, signal?: AbortSignal) {
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
export async function removeCartItem({ cartItemId }: { cartItemId: string }) {
	const response = await axiosInstance.delete(`/auth/cart/item/${cartItemId}`);
	return response.data;
}
export async function updateItemQuantityInCart({ cartItemId, quantity }: { cartItemId: string; quantity: number }) {
	const response = await axiosInstance.put(`/auth/cart/item/${cartItemId}`, {
		quantity,
	});

	return response.data;
}

export async function getCart() {
	const response = await axiosInstance("/auth/cart");
	return response.data;
}

export async function clearCart() {
	const response = await axiosInstance.delete("/auth/cart");
	return response.data;
}

export async function updateCartGroupTitle({ id, title }: { id: string; title: string }) {
	const response = await axiosInstance.put(`/auth/cart/group/${id}/title`, { title });
	return response.data;
}

export async function deleteCartGroup({ id }: { id: string }) {
	const response = await axiosInstance.delete(`/auth/cart/group/${id}`);
	return response.data;
}

export async function addNewCartGroup() {
	const response = await axiosInstance.post(`/auth/cart/group`);
	return response.data;
}

export async function getCartIds({ full }: { full?: boolean }, signal?: AbortSignal) {
	const response = await axiosInstance("/auth/cart/ids", { params: { full }, signal });
	return response.data;
}

export async function getUserSavedCards() {
	const response = await axiosInstance("/auth/cards");
	return response.data;
}
