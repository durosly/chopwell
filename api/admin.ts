import { handleError } from "@/lib/handleError";
import { FoodFormData } from "@/schema/admin-create-food-schema";
import { AdminUpdateFoodBaseInfoSchema } from "@/schema/admin-update-food-base-info-schema";
import { AdminUpdateFoodAvailabilityType } from "@/schema/admin-update-food-availability-schema";
import axios from "axios";
import { AdminUpdateFoodCategoryType } from "@/schema/admin-update-food-category-schema";
import { Region } from "@/types";

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

export async function getUsers({
	page,
	query,
	signal,
}: {
	page: number;
	query?: string;
	signal: AbortSignal;
}) {
	const response = await axiosInstance("/users", {
		params: { page, query },
		signal,
	});
	return response.data;
}

export async function updateUserStatus({
	userId,
	disabled,
}: {
	userId: string;
	disabled: boolean;
}) {
	const response = await axiosInstance.patch(`/users/${userId}/status`, {
		disabled,
	});

	return response.data;
}

// analytics

export async function getUsersAnalytics(params: { dateFrom: string; dateTo: string }) {
	const response = await axiosInstance.get("/analytics/users", { params });
	return response.data;
}

export async function getOrdersAnalytics(params: {
	startDate: string;
	endDate: string;
	status?: string;
}) {
	const response = await axiosInstance.get("/analytics/orders", { params });
	return response.data;
}

export async function getDepositsAnalytics(params: {
	startDate: string;
	endDate: string;
	status?: string;
}) {
	const response = await axiosInstance.get("/analytics/deposits", { params });
	return response.data;
}

// Address and regions

export async function getRegions() {
	const response = await axiosInstance.get("/regions");
	return response.data;
}

export async function createRegion(data: Omit<Region, "_id">) {
	const response = await axiosInstance.post("/regions", data);
	return response.data;
}

export async function updateRegion(regionId: string, data: Omit<Region, "_id">) {
	const response = await axiosInstance.put(`/regions/${regionId}`, data);
	return response.data;
}

export async function deleteRegion(regionId: string) {
	const response = await axiosInstance.delete(`/regions/${regionId}`);
	return response.data;
}

export async function getRegionAnalytics() {
	const response = await axiosInstance.get("/regions/analytics");
	return response.data;
}
