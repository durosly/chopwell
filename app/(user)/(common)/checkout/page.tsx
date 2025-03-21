import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";
import Link from "next/link";
import { LuLock } from "react-icons/lu";
import CartDataDesktop from "./_components/cart-data-desktop";
import PaymentMethod from "./_components/payment-method";
import PaymentMethodInfoDesktop from "./_components/payment-method-info-desktop";
import ShippingMethod from "./_components/shipping-method";
import ShippingMethodInfoDesktop from "./_components/shipping-method-info-desktop";

function CheckoutPage() {
	return (
		<div className="max-w-[1200px] mx-auto px-10 mb-10">
			<div className="flex gap-5 mt-10">
				<div className="flex-1">
					<div className="mb-10">
						<BackButton className="cursor-pointer flex items-center gap-2">
							<IconArrowLeft className="size-5" />
							Back
						</BackButton>
					</div>
					<div className="space-y-5">
						<div>
							<h2 className="text-xl">Cart Information and review</h2>
							<p className="text-xs text-gray-500">
								By proceeding, you are automatically accepting the{" "}
								<Link className="link" href="/terms">
									Terms and condition
								</Link>
							</p>
						</div>

						<CartDataDesktop />

						<div className="card border">
							<div className="card-body">
								<ShippingMethod />
							</div>
						</div>

						<ShippingMethodInfoDesktop />
					</div>
				</div>
				<div className="flex-1">
					<div className="mb-10">
						<h2 className="text-xl">Payment Details</h2>
						<p className="text-xs text-gray-500">Complete your purchase by selection a payment method</p>
					</div>
					<div className="space-y-5">
						<div className="card border">
							<div className="card-body">
								<PaymentMethod />
							</div>
						</div>

						{/* Payment method info desktop */}
						<PaymentMethodInfoDesktop />

						<div className="card border">
							<div className="card-body">
								<div className="mb-5">
									<ul className="mb-2">
										<li className="flex justify-between gap-5">
											<span className="text-gray-500">Subtotal</span>
											<span className="font-semibold">N5,500</span>
										</li>
										<li className="flex justify-between gap-5">
											<span className="text-gray-500">Delivery</span>
											<span className="font-semibold">N500</span>
										</li>
										<li className="flex justify-between gap-5 mb-1">
											<span className="text-gray-500">Discount</span>
											<span className="font-semibold">N100</span>
										</li>
										<li className="flex justify-between gap-5">
											<span className="font-bold">Total</span>
											<span className="font-bold">N6,100</span>
										</li>
									</ul>

									<button className="btn btn-primary btn-block">Checkout (N6,100)</button>
								</div>

								<div>
									<div className="flex items-center gap-2">
										<LuLock className="text-primary" />
										<p className="font-bold">Secure Checkout - SSL Encrypted</p>
									</div>
									<p className="text-gray-500">
										Ensuring your personal and financial information is secured during every transaction
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckoutPage;
