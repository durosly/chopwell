import { handleError } from "@/lib/handleError";
import axios from "axios";

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
