"use client";

import { cn } from "@/utils/cn";
import { PropsWithChildren } from "react";

type FavBtnProps = PropsWithChildren<{ className?: string | undefined }>;

function FavBtn({ className, children }: FavBtnProps) {
	return (
		<button
			onClick={() => console.log("Fav Button")}
			className={cn("fav-btn", className)}>
			{children}
		</button>
	);
}

export default FavBtn;
