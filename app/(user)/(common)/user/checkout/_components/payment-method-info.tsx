"use client";

// import useCheckoutStore from "@/store/checkout-store";
import BalanceDisplay from "./balance-display";
// import CardPaymentInfo from "./card/payment-info";

function PaymentMethodInfo() {
	return <BalanceDisplay />;

	// const { paymentMethod } = useCheckoutStore();

	// if (paymentMethod === "pay-for-me") {
	// 	return (
	// 		<>
	// 			{/* generate pay-for-me link option display */}
	// 			<div>
	// 				<h3 className="font-bold">Generate Pay-for-me Link</h3>
	// 				<p className="text-gray-500">* A unique link would be generated for you to share with the person you want to pay for you</p>
	// 			</div>
	// 		</>
	// 	);
	// } else if (paymentMethod === "card") {
	// 	return <CardPaymentInfo />;
	// } else if (paymentMethod === "wallet") {

	// } else if (paymentMethod === "virtual-account") {
	// 	return (
	// 		<>
	// 			{/* virtual account option display */}
	// 			<div>
	// 				<h3 className="font-bold">Checkout Virtual Account</h3>
	// 				<p className="text-gray-500">* Virtual account would be generated in the next screen</p>
	// 			</div>
	// 		</>
	// 	);
	// }

	// return null;
}

export default PaymentMethodInfo;
