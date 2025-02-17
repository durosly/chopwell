"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type PropType = PropsWithChildren<{
	href: string;
	className?: string | undefined;
}>;

function LinkWithCartAndFav({ href, className, children }: PropType) {
	const router = useRouter();
	function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		e.preventDefault();

		// return if clicked element contains class of 'cart-btn' or 'fav-btn'
		// console.log(e.target);
		// console.log((e.target as Element).classList.contains("fav-btn"));
		if (
			(e.target as Element).classList.contains("cart-btn") ||
			(e.target as Element).classList.contains("fav-btn")
		) {
			return;
		}

		router.push(href);
		console.log("The link was clicked.");
	}
	return (
		<Link onClick={handleClick} href={href} className={cn(className)}>
			{children}
		</Link>
	);
}

export default LinkWithCartAndFav;
