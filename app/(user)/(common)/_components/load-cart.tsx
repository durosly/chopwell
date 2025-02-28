"use client";

import { getCartIds } from "@/api";
import useCartStore from "@/store/cart-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function LoadCart() {
	const { updateCart } = useCartStore();
	const {
		data: favourites,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["cart", "ids"],
		queryFn: () => getCartIds({}),
	});

	useEffect(() => {
		if (!isLoading && isSuccess) {
			const data = favourites?.data;
			if (data) {
				updateCart(data);
			}
		}
	}, [favourites, isLoading, isSuccess, updateCart]);

	return null;
}

export default LoadCart;
