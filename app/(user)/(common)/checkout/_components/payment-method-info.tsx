"use client";

import IconCardTick from "@/icons/card-tick";
import IconDoubleCard from "@/icons/cards";
import Link from "next/link";
import { LuEye } from "react-icons/lu";
import useCheckoutStore from "@/store/checkout-store";

function PaymentMethodInfo() {
	const { paymentMethod } = useCheckoutStore();

	if (paymentMethod === "pay-for-me") {
		return (
			<>
				{/* generate pay-for-me link option display */}
				<div>
					<h3 className="font-bold">Generate Pay-for-me Link</h3>
					<p className="text-gray-500">* A unique link would be generated for you to share with the person you want to pay for you</p>
				</div>
			</>
		);
	} else if (paymentMethod === "card") {
		return (
			<>
				{/* choose card option display */}
				<div>
					<h3 className="font-bold">Choose Card</h3>
					<fieldset className="fieldset gap-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<label
								key={i}
								className="flex items-center px-4 py-2 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
								<input name="address" type="radio" className="radio radio-xs checked:radio-primary" />
								<div>
									<p className="font-bold truncate max-w-[400px]">1234 **** 123</p>
									<p className="text-xs opacity-50">Visa</p>
								</div>
							</label>
						))}
					</fieldset>
					<div className="mt-2">
						<button className="btn btn-neutral">Add new card</button>
					</div>
					<form className="px-3" action="">
						<label className="form-control">
							<div className="label">
								<span className="label-text-alt">Card Number</span>
							</div>
							<div className="input flex items-center gap-2">
								<input type="text" className="grow text-xs" placeholder="1234 5678 8908 7654" />

								<IconDoubleCard className="h-6 w-6 " />
							</div>
						</label>

						<div className="flex gap-5 justify-between items-center mb-5">
							<label className="">
								<div className="label">
									<span className="label-text-alt">Expiry Date</span>
								</div>

								<input type="text" className="input text-xs" placeholder="MM/YY" />
							</label>
							<label className="">
								<div className="label">
									<span className="label-text-alt">CVC/CVV</span>
								</div>
								<div className="input flex items-center gap-2">
									<input type="text" className="w-[80%] grow text-xs" placeholder="3 digits" maxLength={3} />

									<IconCardTick className="h-6 w-6 text-dark" />
								</div>
							</label>
						</div>

						<div className="form-control mb-5">
							<label className="label cursor-pointer items-center">
								<span className="label-text font-bold">Save card for future</span>

								<input type="checkbox" defaultChecked className="toggle toggle-xs checked:toggle-primary" />
							</label>
						</div>
						<button className="btn btn-neutral btn-block">Done</button>
					</form>
				</div>
			</>
		);
	} else if (paymentMethod === "wallet") {
		return (
			<>
				{/* Chopwell balance option display */}
				<div>
					<h3 className="font-bold">Balance</h3>
					<div>
						<p className="mb-2">
							Your current balance is <span className="text-primary">****</span>{" "}
							<button>
								<LuEye />
							</button>
						</p>
						<p className="text-xs">
							Top up your balance{" "}
							<Link className="link" href="/wallet/top-up">
								here
							</Link>
						</p>
					</div>
				</div>
			</>
		);
	} else if (paymentMethod === "virtual-account") {
		return (
			<>
				{/* virtual account option display */}
				<div>
					<h3 className="font-bold">Checkout Virtual Account</h3>
					<p className="text-gray-500">* Virtual account would be generated in the next screen</p>
				</div>
			</>
		);
	}

	return null;
}

export default PaymentMethodInfo;
