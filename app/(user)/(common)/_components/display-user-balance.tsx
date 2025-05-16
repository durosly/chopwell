"use client";

import { useUserBalance } from "@/hooks/useUserData";
import commaNumber from "@/utils/comma-number";

function DisplayUserBalance() {
	const { data, isLoading, isError } = useUserBalance();

	if (isLoading) return <span className="loading loading-spinner loading-sm"></span>;
	if (isError) return "Error";

	return commaNumber(data?.balance);
}

export default DisplayUserBalance;
