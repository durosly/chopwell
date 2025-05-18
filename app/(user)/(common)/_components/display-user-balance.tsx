"use client";

import { useUserBalance } from "@/hooks/useUserData";
import commaNumber from "@/utils/comma-number";
import Link from "next/link";
import useCartStore from "@/store/cart-store";

function DisplayUserBalance() {
	const { data, isLoading, isError } = useUserBalance();
	const { closeCartModal } = useCartStore();

	if (isLoading) return <span className="loading loading-spinner loading-sm"></span>;
	if (isError) return "Error";

	return (
		<Link href="/user/wallet/top-up" onClick={() => closeCartModal()}>
			{commaNumber(data?.balance)}
		</Link>
	);
}

export default DisplayUserBalance;
