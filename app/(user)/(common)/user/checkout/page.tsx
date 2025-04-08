import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";
import Link from "next/link";
import CartDataDesktop from "./_components/cart-data-desktop";
import CheckoutPayment from "./_components/checkout-payment";
// import PaymentMethod from "./_components/payment-method";
import PaymentMethodInfoDesktop from "./_components/payment-method-info-desktop";
import ShippingMethod from "./_components/shipping-method";
import ShippingMethodInfoDesktop from "./_components/shipping-method-info-desktop";
import getCheckoutDataAction from "@/actions/get-checkout-action";
import HydrateStore from "./_components/hydrate-store";
import { CartResponse } from "@/types";

async function CheckoutPage() {
	const checkoutData = await getCheckoutDataAction();

	if (checkoutData.status === false) {
		return (
			<>
				<div className="max-w-[1200px] mx-auto px-5 md:px-10 mb-10">
					<p>{checkoutData.message}</p>
				</div>
			</>
		);
	}

	// console.log(checkoutData, "checkout");
	return (
		<HydrateStore data={checkoutData.data as CartResponse}>
			<div className="max-w-[1200px] mx-auto px-5 md:px-10 mb-10">
				<div className="flex flex-col md:flex-row gap-5 mt-10">
					<div className="flex-1">
						<div className="mb-10">
							<BackButton className="cursor-pointer flex items-center gap-2">
								<IconArrowLeft className="size-5" />
								Back
							</BackButton>
						</div>
						<div className="space-y-5">
							<div>
								<h2 className="text-xl">
									Cart Information and review
								</h2>
								<p className="text-xs text-gray-500">
									By proceeding, you are
									automatically accepting the{" "}
									<Link
										className="link"
										href="/terms">
										Terms and condition
									</Link>
								</p>
							</div>

							<CartDataDesktop />

							<div className="card border">
								<div className="card-body @container">
									<ShippingMethod />
								</div>
							</div>

							<ShippingMethodInfoDesktop />
						</div>
					</div>
					<div className="flex-1">
						<div className="mb-10 max-md:hidden">
							<h2 className="text-xl">Payment Details</h2>
							<p className="text-xs text-gray-500">
								Complete your purchase by selection
								a payment method
							</p>
						</div>
						<div className="space-y-5">
							{/* <div className="card border">
								<div className="card-body @container">
									<PaymentMethod />
								</div>
							</div> */}

							{/* Payment method info desktop */}
							<PaymentMethodInfoDesktop />

							<div className="card border">
								<div className="card-body">
									<CheckoutPayment />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</HydrateStore>
	);
}

export default CheckoutPage;
