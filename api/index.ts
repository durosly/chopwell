import { handleError } from "@/lib/handleError";
import { OrderData, PopupItems } from "@/types";
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

// Favoutite API
export async function addItemToFavourite({ foodId }: { foodId: string }, signal?: AbortSignal) {
	const response = await axiosInstance.post("/auth/user/fav", { foodId }, { signal });
	return response.data;
}

export async function removeItemFromFavourite(
	{ foodId }: { foodId: string },
	signal?: AbortSignal
) {
	const response = await axiosInstance.delete("/auth/user/fav", {
		data: { foodId },
		signal,
	});

	return response.data;
}

export async function getFavourites({ full }: { full?: boolean }, signal?: AbortSignal) {
	const response = await axiosInstance("/auth/user/fav", { params: { full }, signal });
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
export async function updateItemQuantityInCart({
	cartItemId,
	quantity,
}: {
	cartItemId: string;
	quantity: number;
}) {
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
export async function moveCartItem({
	cartItemId,
	groupId,
}: {
	cartItemId: string;
	groupId: string;
}) {
	const response = await axiosInstance.post(`/cart/move-cart-item`, { cartItemId, groupId });
	return response.data;
}
export async function copyCartItem({
	cartItemId,
	groupId,
}: {
	cartItemId: string;
	groupId: string;
}) {
	const response = await axiosInstance.post(`/cart/copy-cart-item`, { cartItemId, groupId });
	return response.data;
}

export async function getCartIds(params?: { full?: boolean }, signal?: AbortSignal) {
	const response = await axiosInstance("/cart/ids", { params, signal });
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

// // Load items from order code
export async function loadItemsFromOrderCode(orderCode: string) {
	const response = await axiosInstance(`/orders/${orderCode}/items`);
	return response.data;
}

export async function addItemToCartFromOrderCode(data: PopupItems) {
	const response = await axiosInstance.post(`/cart/add-from-order-code`, data);
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

export async function updateUserAddress(data: AddAddressType, id: string) {
	const response = await axiosInstance.put(`/auth/user/address/${id}`, data);
	return response.data;
}
export async function deleteUserAddress(id: string) {
	const response = await axiosInstance.delete(`/auth/user/address/${id}`);
	return response.data;
}

export async function makeAddressDefault(addressId: string) {
	const response = await axiosInstance.put(`/auth/user/address/${addressId}/default`);
	return response.data;
}

// Checkout API
export async function getCheckoutData() {
	const response = await axiosInstance("/checkout");
	return response.data;
}

export async function createCheckoutSession(data: OrderData) {
	const response = await axiosInstance.post("/auth/user/checkout", data);
	return response.data;
}

// User API
export async function updateUsername(data: { firstname: string; lastname: string }) {
	const response = await axiosInstance.put("/auth/user/name", data);
	return response.data;
}
export async function updateUserPhone(data: { phone: string }) {
	const response = await axiosInstance.put("/auth/user/phone", data);
	return response.data;
}
export async function updateUserEmail(data: { email: string }) {
	const response = await axiosInstance.put("/auth/user/email", data);
	return response.data;
}

// //// (notifications)
export async function getUserNotifications() {
	const response = await axiosInstance("/auth/user/notifications");
	return response.data;
}

export async function deleteUserNotification(id: string) {
	const response = await axiosInstance.delete(`/auth/user/notifications/${id}`);
	return response.data;
}
export async function markUserNotificationAsRead(id: string) {
	const response = await axiosInstance.put(`/auth/user/notifications/${id}`);
	return response.data;
}

// Transaction API
export async function createTransactionSession(amount: number) {
	const response = await axiosInstance.post("/auth/user/transactions/init", { amount });
	return response.data;
}

// Reorder API
export async function reorderOrder({ orderId, addressId }: { orderId: string; addressId: string }) {
	const response = await axiosInstance.post(`/auth/user/orders/${orderId}/reorder`, {
		addressId,
	});
	return response.data;
}

// Product API
export async function getProduct(id: string) {
	const response = await axiosInstance(`/products/${id}`);
	return response.data;
}

export async function getProducts(
	params?: {
		page?: number;
		query?: string;
		minPrice?: number;
		maxPrice?: number;
		mealTime?: string;
		sortBy?: string;
		category?: string;
		subCategory?: string;
	},
	signal?: AbortSignal
) {
	const response = await axiosInstance("/products", { params, signal });
	return response.data;
}
