"use client";

import { useLoadCartFromOrderCode } from "@/hooks/useCart";
import { handleError } from "@/lib/handleError";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import PopupCartItems from "./popup-cart-items";

function PopupCartItemLoader() {
	const [orderCode, setOrderCode] = useState("");
	const { mutate, isPending, isError, error, reset, data, isSuccess } =
		useLoadCartFromOrderCode({
			onSuccess: () => {
				setOrderCode("");
			},
		});

	useEffect(() => {
		if (isError) {
			setTimeout(() => reset(), 5000);
		}
	}, [isError, reset]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		mutate(orderCode);
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

					<h3 className="font-bold text-lg">Shopping Cart</h3>
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
