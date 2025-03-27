"use client";

import useCheckoutStore from "@/store/checkout-store";
import { LuCreditCard, LuLandmark, LuLink, LuUser } from "react-icons/lu";

function PaymentMethod() {
	const { paymentMethod, setPaymentMethod } = useCheckoutStore();

	return (
		<>
			<h3 className="font-bold">Select payment method</h3>

			<fieldset className="fieldset @md:grid-cols-2 gap-4">
				<legend className="sr-only">Shipping info</legend>
				<label className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
					<div>
						<LuCreditCard className="size-6" />
						<span>Debit/Credit Card</span>
					</div>
					<input
						name="payment-method"
						type="radio"
						checked={paymentMethod === "card"}
						onChange={() => setPaymentMethod("card")}
						className="radio radio-xs checked:radio-primary ml-auto"
					/>
				</label>
				<label className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
					<div>
						<LuLandmark className="size-6" />
						<span>Virtual Account</span>
					</div>
					<input
						name="payment-method"
						type="radio"
						checked={paymentMethod === "virtual-account"}
						onChange={() => setPaymentMethod("virtual-account")}
						className="radio radio-xs checked:radio-primary ml-auto"
					/>
				</label>
				<label className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
					<div>
						<LuUser className="size-6" />
						<span>Chopwell Balance</span>
					</div>
					<input
						name="payment-method"
						type="radio"
						checked={paymentMethod === "wallet"}
						onChange={() => setPaymentMethod("wallet")}
						className="radio radio-xs checked:radio-primary ml-auto"
					/>
				</label>
				<label className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
					<div>
						<LuLink className="size-6" />
						<span>Generate Pay-for-me Link</span>
					</div>
					<input
						name="payment-method"
						type="radio"
						checked={paymentMethod === "pay-for-me"}
						onChange={() => setPaymentMethod("pay-for-me")}
						className="radio radio-xs checked:radio-primary ml-auto"
					/>
				</label>
			</fieldset>
		</>
	);
}

export default PaymentMethod;
