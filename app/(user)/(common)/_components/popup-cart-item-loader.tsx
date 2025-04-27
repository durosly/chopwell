"use client";

import { loadItemsFromOrderCode } from "@/api";
import { handleError } from "@/lib/handleError";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import PopupCartItems from "./popup-cart-items";

function PopupCartItemLoader() {
	const [orderCode, setOrderCode] = useState("");
	const toastRef = useRef<string | number | undefined>(undefined);
	const { mutate, isPending, isError, error, reset, data, isSuccess } = useMutation({
		onMutate: () => {
			toastRef.current = toast.loading("Loading items...", {
				duration: Infinity,
			});
		},
		mutationFn: async () => loadItemsFromOrderCode(orderCode),
		onSuccess: () => {
			setOrderCode("");
			toast.success("Items loaded successfully", { id: toastRef.current });
		},
		onError: () => {
			toast.error("Failed to load items", { id: toastRef.current });
		},
		onSettled: () => {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
		},
	});

	useEffect(() => {
		if (isError) {
			setTimeout(() => reset(), 5000);
		}
	}, [isError, reset]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		mutate();
	}
	return (
		<>
			{isSuccess && Object.keys(data.items).length > 0 ? (
				<>
					<PopupCartItems data={data} />
					<button
						onClick={() => reset()}
						className="btn btn-block mt-2">
						Cancel
					</button>
				</>
			) : (
				<>
					<AnimatePresence>
						{isError && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								className="alert alert-error alert-soft">
								{handleError(error)}
							</motion.div>
						)}
					</AnimatePresence>
					<form
						onSubmit={handleSubmit}
						className="flex max-sm:flex-col gap-2">
						{/* input to enter previous order code to restore cart */}
						<fieldset className="fieldset flex-1">
							<legend className="fieldset-legend sr-only">
								Order code
							</legend>
							<input
								type="text"
								className="input w-full"
								placeholder="Enter order code"
								required
								disabled={isPending}
								value={orderCode}
								onChange={(e) =>
									setOrderCode(e.target.value)
								}
							/>
							<p className="label">
								Enter code to load items into cart
							</p>
						</fieldset>
						<button
							className="btn mt-1 btn-primary"
							disabled={isPending}>
							{isPending ? "Loading..." : "Load items"}
						</button>
					</form>
				</>
			)}
		</>
	);
}

export default PopupCartItemLoader;
