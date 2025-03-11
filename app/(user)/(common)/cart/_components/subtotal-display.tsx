"use client";

import { getCart } from "@/api";
import commaNumber from "@/utils/comma-number";
import { useQuery } from "@tanstack/react-query";

function SubtotalDisplay() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["cart-full-data"],
		queryFn: () => getCart(),
		refetchOnWindowFocus: false,
	});

	if (isError || isLoading) {
		return null;
	}

	return <>{commaNumber(data.subtotal)}</>;
}

export default SubtotalDisplay;
