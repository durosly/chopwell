import { handleError } from "@/lib/handleError";
import { AddAddressType } from "@/types/add-address";
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
	const response = await axiosInstance.post("/fav", { foodId }, { signal });
	return response.data;
}

export async function removeItemFromFavourite({ foodId }: { foodId: string }, signal?: AbortSignal) {
	const response = await axiosInstance.delete("/fav", {
		data: { foodId },
		signal,
	});

	return response.data;
}

export async function getFavourites({ full }: { full?: boolean }, signal?: AbortSignal) {
	const response = await axiosInstance("/fav", { params: { full }, signal });
	return response.data;
}

// Cart API
export async function addItemToCart({ foodId }: { foodId: string }) {
	const response = await axiosInstance.post("/cart", { foodId });
	return response.data;
}
export async function removeCartItem({ cartItemId }: { cartItemId: string }) {
	const response = await axiosInstance.delete(`/cart/item/${cartItemId}`);
	return response.data;
}
export async function updateItemQuantityInCart({ cartItemId, quantity }: { cartItemId: string; quantity: number }) {
	const response = await axiosInstance.put(`/cart/item/${cartItemId}`, {
		quantity,
	});

	return response.data;
}

export async function getCart() {
	const response = await axiosInstance("/cart");
	return response.data;
}

export async function clearCart() {
	const response = await axiosInstance.delete("/cart");
	return response.data;
}

export async function updateCartGroupTitle({ id, title }: { id: string; title: string }) {
	const response = await axiosInstance.put(`/cart/group/${id}/title`, { title });
	return response.data;
}

export async function deleteCartGroup({ id }: { id: string }) {
	const response = await axiosInstance.delete(`/cart/group/${id}`);
	return response.data;
}

export async function addNewCartGroup() {
	const response = await axiosInstance.post(`/cart/group`);
	return response.data;
}

export async function getCartIds({ full }: { full?: boolean }, signal?: AbortSignal) {
	const response = await axiosInstance("/cart/ids", { params: { full }, signal });
	return response.data;
}

export async function getUserSavedCards() {
	const response = await axiosInstance("/auth/user/cards");
	return response.data;
}
export async function getUserWalletBalance() {
	const response = await axiosInstance("/auth/user/balance");
	return response.data;
}

// Regions and address
export async function getUserAddress() {
	const response = await axiosInstance("/auth/user/address");
	return response.data;
}
export async function getRegions() {
	const response = await axiosInstance("/auth/user/address/regions");
	return response.data;
}

export async function addNewAddress(data: AddAddressType) {
	const response = await axiosInstance.post(`/auth/user/address`, data);
	return response.data;
}
