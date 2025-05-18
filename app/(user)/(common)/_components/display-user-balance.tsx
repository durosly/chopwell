"use client";

import { useUserBalance } from "@/hooks/useUserData";
import commaNumber from "@/utils/comma-number";
import Link from "next/link";

function DisplayUserBalance() {
	const { data, isLoading, isError } = useUserBalance();

	if (isLoading) return <span className="loading loading-spinner loading-sm"></span>;
	if (isError) return "Error";

	return <Link href="/user/wallet/top-up">{commaNumber(data?.balance)}</Link>;
}

export default DisplayUserBalance;
