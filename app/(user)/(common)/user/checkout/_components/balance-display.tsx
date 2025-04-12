"use client";

import { getUserWalletBalance } from "@/api";
import { handleError } from "@/lib/handleError";
import useCheckoutStore from "@/store/checkout-store";
import commaNumber from "@/utils/comma-number";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

function BalanceDisplay() {
	const { total } = useCheckoutStore();
	const [showBalance, setShowBalance] = useState(false);
	const { isPending, isError, error, data } = useQuery({
		queryKey: ["balance"],
		queryFn: getUserWalletBalance,
	});

	if (isPending) {
		return (
			<div>
				<h3 className="card-title text-lg font-bold">Balance</h3>
				<div className="skeleton h-6 w-32"></div>
			</div>
		);
	}

	if (isError) {
		return (
			<div>
				<h3 className="card-title text-lg font-bold">Balance</h3>
				<div className="alert alert-error">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Error: {handleError(error)}</span>
				</div>
			</div>
		);
	}

	const { balance } = data;

	return (
		<div className="">
			<h3 className="font-bold">Balance</h3>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<p className="text-base">
						Your current balance is{" "}
						<span className="text-primary font-bold">
							{showBalance
								? `${commaNumber(balance)}`
								: "****"}
						</span>
					</p>
					<button
						className="btn btn-ghost btn-sm"
						onClick={() => setShowBalance((prev) => !prev)}>
						{showBalance ? (
							<LuEyeClosed className="w-4 h-4" />
						) : (
							<LuEye className="w-4 h-4" />
						)}
					</button>
				</div>
				{total > balance ? (
					<div className="flex flex-col gap-1">
						<div className="alert alert-error alert-soft">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							<span>Insufficient balance</span>
						</div>
						<p className="text-sm">
							Top up your balance{" "}
							<Link
								className="link link-primary"
								href="/user/wallet/top-up">
								here
							</Link>
						</p>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default BalanceDisplay;
