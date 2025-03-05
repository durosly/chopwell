"use client";

import { addNewCartGroup } from "@/api";
import { handleError } from "@/lib/handleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { LuPlus } from "react-icons/lu";
import { toast } from "sonner";

function AddNewCartGroupButton() {
	const toastRef = useRef<string | number | undefined>(undefined);
	// tanstack mutation to add new group
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		onMutate: () => {
			toastRef.current = toast.loading("Adding new group...", {
				duration: Infinity,
			});
		},
		mutationFn: () => {
			return addNewCartGroup();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart-full-data"] });
			toast.success("Group added successfully", {
				id: toastRef.current,
				duration: 3000,
			});
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Error", {
				description: message,
				id: toastRef.current,
				duration: 3000,
			});
		},
	});
	return (
		<button
			disabled={isPending}
			onClick={() => mutate()}
			className="btn btn-primary btn-sm">
			<LuPlus />
			<span className="max-sm:hidden">Add new group</span>
		</button>
	);
}

export default AddNewCartGroupButton;
