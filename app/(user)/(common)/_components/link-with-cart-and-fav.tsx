"use client";

import { cn } from "@/utils/cn";
// import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { PropsWithChildren } from "react";

type PropType = PropsWithChildren<{
	href: string;
	className?: string | undefined;
}>;

function LinkWithCartAndFav({ href, className, children }: PropType) {
	const router = useRouter();
	function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.preventDefault();

		// return if clicked element contains class of 'cart-btn' or 'fav-btn'
		// console.log(e.target);
		// console.log((e.target as Element).classList.contains("cart-btn"));
		if (
			(e.target as Element).classList.contains("cart-btn") ||
			(e.target as Element).classList.contains("fav-btn")
		) {
			return;
		} else {
			router.push(href);
		}
	}
	return (
		<div aria-label="link" onClick={handleClick} className={cn(className)}>
			{children}
		</div>
	);
}

export default LinkWithCartAndFav;
