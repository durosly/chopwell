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
