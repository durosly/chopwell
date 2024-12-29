"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

function BackButton({ className, children }: PropsWithChildren & { className?: string | undefined }) {
	const router = useRouter();
	return (
		<button onClick={() => router.back()} className={className}>
			{children}
		</button>
	);
}

export default BackButton;
