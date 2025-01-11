import axios from "axios";

export async function getCategories(page: number) {
	const response = await axios("/api/admin/categories", { params: { page } });
	return response.data;
}
