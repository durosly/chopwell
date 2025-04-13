"use client";

import { cn } from "@/utils/cn";
import { PropsWithChildren, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { reorderOrder } from "@/api";
import { toast } from "sonner";
import { handleError } from "@/lib/handleError";
import AddressModal from "./address-modal";

type PropType = PropsWithChildren<{ orderId: string; className?: string | undefined }>;

function ReOrderBtn({ children, orderId, className }: PropType) {
	const toastId = useRef<string | number | undefined>(undefined);
	const [isOpen, setIsOpen] = useState(false);

	const { mutate, isPending } = useMutation({
		mutationFn: (addressId: string) => reorderOrder({ orderId, addressId }),
		onMutate: () => {
			toastId.current = toast.loading("Reordering your order...", {
				duration: Infinity,
			});
		},
		onSuccess: () => {
			toast.success("Order reordered successfully", { id: toastId.current });
		},
		onError: (error) => {
			toast.error(handleError(error), { id: toastId.current });
		},
		onSettled: () => {
			setTimeout(() => toast.dismiss(toastId.current), 5000);
		},
	});

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				disabled={isPending}
				className={cn(className)}>
				{isPending ? "Reordering..." : children}
			</button>
			{isOpen && <AddressModal setIsOpen={setIsOpen} mutate={mutate} />}
		</>
	);
}

export default ReOrderBtn;
