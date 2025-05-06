import { handleError } from "@/lib/handleError";
import { FoodFormData } from "@/schema/admin-create-food-schema";
import { AdminUpdateFoodBaseInfoSchema } from "@/schema/admin-update-food-base-info-schema";
import { AdminUpdateFoodAvailabilityType } from "@/schema/admin-update-food-availability-schema";
import axios from "axios";
import { AdminUpdateFoodCategoryType } from "@/schema/admin-update-food-category-schema";

const axiosInstance = axios.create({
	baseURL: "/api/admin",
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		const message = handleError(error);
		return Promise.reject(message);
	}
);

export async function getCategories(page: number, query: string, signal: AbortSignal) {
	const response = await axiosInstance("/categories", {
		params: { page, query },
		signal,
	});
	return response.data;
}

export async function deleteCategory(categoryId: string) {
	const response = await axiosInstance.delete(`/categories/${categoryId}`);

	return response.data;
}

export async function getSubCategoriesByCategoryId(
	categoryId: string,
	page: number,
	query: string,
	signal: AbortSignal
) {
	const response = await axiosInstance.get(`/categories/${categoryId}/subcategories`, {
		params: { page, query },
		signal,
	});
	return response.data;
}

export async function deleteSubCategory(subCategoryId: string) {
	const response = await axiosInstance.delete(`/subcategories/${subCategoryId}`);

	return response.data;
}

export async function getCategorization() {
	const response = await axiosInstance("/categorization");

	return response.data;
}

// food

export async function getFoods({
	page,
	query,
	category,
	subCategory,
	signal,
}: {
	page: number;
	query?: string;
	category?: string;
	subCategory?: string;
	signal: AbortSignal;
}) {
	const response = await axiosInstance("/foods", {
		params: { page, query, category, subCategory },
		signal,
	});
	return response.data;
}

export async function createFood(data: FoodFormData) {
	const response = await axiosInstance.post("/foods", data);
	return response.data;
}

export async function updateFood(foodId: string, data: FoodFormData) {
	const response = await axiosInstance.put(`/foods/${foodId}`, data);
	return response.data;
}

export async function updateFoodBaseInfo(foodId: string, data: AdminUpdateFoodBaseInfoSchema) {
	const response = await axiosInstance.put(`/foods/${foodId}/base-info`, data);
	return response.data;
}

export async function updateFoodAvailability(
	foodId: string,
	data: AdminUpdateFoodAvailabilityType
) {
	const response = await axiosInstance.put(`/foods/${foodId}/availability`, data);
	return response.data;
}

export async function updateFoodCategory(foodId: string, data: AdminUpdateFoodCategoryType) {
	const response = await axiosInstance.put(`/foods/${foodId}/category`, data);
	return response.data;
}

export async function updateFoodImage(foodId: string, data: { image: string }) {
	const response = await axiosInstance.put(`/foods/${foodId}/image`, data);
	return response.data;
}

export async function deleteFood(foodId: string) {
	const response = await axiosInstance.delete(`/foods/${foodId}`);
	return response.data;
}

// orders

export async function getOrders(params: {
	search: string;
	status: string;
	dateFrom: string;
	dateTo: string;
	page: number;
}) {
	const response = await axiosInstance.get("/orders", { params });
	return response.data;
}

export async function updateOrderStatus(orderId: string, status: string) {
	const response = await axiosInstance.put(`/orders/${orderId}/status`, { status });
	return response.data;
}
