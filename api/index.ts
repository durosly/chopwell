import axios from "axios";

export async function getCategories(page: number, query: string, signal: AbortSignal) {
	const response = await axios("/api/admin/categories", { params: { page, query }, signal });
	return response.data;
}
