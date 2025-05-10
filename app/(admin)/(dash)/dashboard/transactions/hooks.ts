import { useQuery } from "@tanstack/react-query";
import { Transaction, TransactionFilters } from "./types";

const fetchTransactions = async (filters: TransactionFilters) => {
	const params = new URLSearchParams();

	if (filters.status) params.append("status", filters.status);
	if (filters.type) params.append("type", filters.type);
	if (filters.startDate) params.append("startDate", filters.startDate);
	if (filters.endDate) params.append("endDate", filters.endDate);

	const response = await fetch(`/api/admin/transactions?${params.toString()}`);
	if (!response.ok) {
		throw new Error("Failed to fetch transactions");
	}
	return response.json();
};

export const useTransactions = (filters: TransactionFilters) => {
	return useQuery<Transaction[]>({
		queryKey: ["transactions", filters],
		queryFn: () => fetchTransactions(filters),
	});
};
