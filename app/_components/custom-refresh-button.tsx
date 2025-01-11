"use client";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type PropType = { className?: string | undefined } & PropsWithChildren;
function CustomRefreshButton({ className, children }: PropType) {
	const router = useRouter();
	return (
		<button onClick={() => router.refresh()} className={className}>
			{children}
		</button>
	);
}

export default CustomRefreshButton;
