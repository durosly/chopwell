"use client";

import { cn } from "@/utils/cn";
import { PropsWithChildren } from "react";

type CartBtnProps = PropsWithChildren<{
	className?: string | undefined;
}>;

function CartBtn({ className, children }: CartBtnProps) {
	return (
		<button
			onClick={() => console.log("cart btn clicked")}
			className={cn("fav-btn", className)}>
			{children}
		</button>
	);
}

export default CartBtn;
