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
	const { isPending, isError, error, data } = useQuery({ queryKey: ["balance"], queryFn: getUserWalletBalance });

	if (isPending) {
		return (
			<div>
				<h3 className="font-bold">Balance</h3>
				<p>Loading...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div>
				<h3 className="font-bold">Balance</h3>
				<p>Error: {handleError(error)}</p>
			</div>
		);
	}

	const { balance } = data;

	return (
		<div>
			<h3 className="font-bold">Balance</h3>
			<div>
				<p className="mb-2">
					Your current balance is <span className="text-primary">{showBalance ? commaNumber(balance) : "****"}</span>
					<button className="cursor-pointer ml-2" onClick={() => setShowBalance((prev) => !prev)}>
						{showBalance ? <LuEyeClosed /> : <LuEye />}
					</button>
				</p>
				{total > balance ? (
					<>
						<p className="text-red-500 text-xs">Insufficient balance</p>
						<p className="text-xs">
							Top up your balance{" "}
							<Link className="link" href="/wallet/top-up">
								here
							</Link>
						</p>
					</>
				) : null}
			</div>
		</div>
	);
}

export default BalanceDisplay;
