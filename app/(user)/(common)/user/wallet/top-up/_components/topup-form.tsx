"use client";

import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Paystack from "@paystack/inline-js";
import { createTransactionSession } from "@/api";
import { toast } from "sonner";
import { handleError } from "@/lib/handleError";

function TopupForm() {
	const popup = new Paystack();
	const toastRef = useRef<string | number | undefined>(undefined);
	const [amount, setAmount] = useState<string | number>("");

	const { mutate } = useMutation({
		mutationFn: (amount: number) => createTransactionSession(amount),
		onMutate: () => {
			toastRef.current = toast.loading("Creating transaction session...", {
				duration: Infinity,
			});
		},
		onSuccess: (data) => {
			toast.success("Session created", { id: toastRef.current });
			setAmount("");
			popup.resumeTransaction(data.data.access_code);
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, { id: toastRef.current });
		},
		onSettled: () => {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
		},
	});

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (Number(amount)) {
			mutate(Number(amount));
		} else {
			toast.error("Enter numbers only");
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="px-5 mb-10 space-y-4 max-w-2xl mx-auto"
			action="">
			<fieldset className="fieldset">
				<div className="label">
					<span className="label-text">Amount</span>
				</div>
				<input
					type="number"
					inputMode="numeric"
					placeholder="Enter Amount"
					className="input w-full"
					value={amount}
					onChange={(e) => setAmount(e.target.valueAsNumber)}
				/>
			</fieldset>
			<div className="flex flex-wrap gap-2">
				<input
					type="radio"
					name="custom-amount"
					className="btn btn-sm checked:bg-primary checked:text-primary-content"
					aria-label="N1,000"
					checked={amount === 1_000}
					onChange={() => setAmount(1_000)}
				/>
				<input
					type="radio"
					name="custom-amount"
					className="btn btn-sm checked:bg-primary checked:text-primary-content"
					aria-label="N2,000"
					checked={amount === 2_000}
					onChange={() => setAmount(2_000)}
				/>
				<input
					type="radio"
					name="custom-amount"
					className="btn btn-sm checked:bg-primary checked:text-primary-content"
					aria-label="N5,000"
					checked={amount === 5_000}
					onChange={() => setAmount(5_000)}
				/>
				<input
					type="radio"
					name="custom-amount"
					className="btn btn-sm checked:bg-primary checked:text-primary-content"
					aria-label="N7,000"
					checked={amount === 7_000}
					onChange={() => setAmount(7_000)}
				/>
				<input
					type="radio"
					name="custom-amount"
					className="btn btn-sm checked:bg-primary checked:text-primary-content"
					aria-label="N10,000"
					checked={amount === 10_000}
					onChange={() => setAmount(10_000)}
				/>
			</div>

			<button className="btn btn-primary btn-block btn-sm">Proceed</button>
		</form>
	);
}

export default TopupForm;
