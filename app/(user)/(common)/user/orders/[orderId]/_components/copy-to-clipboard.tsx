"use client";

import { PropsWithChildren } from "react";
import { toast } from "sonner";

type PropType = PropsWithChildren<{ className?: string | undefined; code: string }>;

function CopyToClipboardButton({ children, code, className }: PropType) {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			toast.success("Copied to clipboard!");
		} catch (err: unknown) {
			console.error("Failed to copy to clipboard:", err);
			toast.error("Failed to copy to clipboard");
		}
	};

	return (
		<button onClick={handleCopy} className={className}>
			{children}
		</button>
	);
}

export default CopyToClipboardButton;
