import { getUserWalletBalance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUserBalance = () => {
	return useQuery({ queryKey: ["user-balance"], queryFn: () => getUserWalletBalance() });
};
