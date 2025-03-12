import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";
import IconCardTick from "@/icons/card-tick";
import IconDoubleCard from "@/icons/cards";
import Link from "next/link";
import { LuBox, LuCreditCard, LuEye, LuLandmark, LuLink, LuLock, LuTruck, LuUser } from "react-icons/lu";

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

						<div className="space-y-4">
							{Array.from({ length: 2 }).map((_, i) => (
								<div key={i} className="card border rounded-box">
									<div className="card-body">
										<h3 className="font-bold">My Cart ({i + 1})</h3>
										<p className="text-xs">
											Total: <span className="text-gray-500">N5,000(60%)</span>
										</p>
										<ul className="list mb-5">
											{Array.from({
												length: 5,
											}).map((__, j) => (
												<li key={j} className="list-row py-2">
													<div className="font-thin tabular-nums">
														{(1 + j).toString().padStart(2, "0")}.
													</div>
													<Link className="link" href="/product/1">
														green peas
													</Link>{" "}
													<span className="text-gray-500">(N1,200 x 2 = N1,400)</span>
												</li>
											))}
										</ul>
										<div>
											<fieldset className="fieldset">
												<legend className="fieldset-legend sr-only">Schedule delivery</legend>
												<label className="fieldset-label">
													<span>Schedule Delivery</span>
													<input
														type="checkbox"
														defaultChecked
														className="toggle checked:toggle-primary"
													/>
												</label>
											</fieldset>

											<fieldset className="fieldset">
												<legend className="fieldset-legend sr-only">Delivery Date</legend>
												<input
													type="datetime-local"
													className="input"
													min="2025-03-03T00:00"
													max="2025-03-20T23:59"
												/>
												<span className="fieldset-label text-xs mb-2">Mon 12th, Mar (2:30 PM)</span>
											</fieldset>
											<fieldset className="fieldset">
												<legend className="fieldset-label">Note (optional)</legend>
												<input
													type="text"
													className="input"
													placeholder="Type in your note..."
													maxLength={500}
												/>
											</fieldset>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="card border">
							<div className="card-body">
								<h3 className="font-bold">Shipping info</h3>
								<fieldset className="fieldset grid-cols-2 gap-4">
									<legend className="sr-only">Shipping info</legend>
									<label className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
										<LuTruck className="size-6" />
										<span>Delivery</span>
										<input name="delivery" type="radio" className="radio radio-xs checked:radio-primary ml-auto" />
									</label>
									<label className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
										<LuBox className="size-6" />
										<span>Pickup</span>
										<input name="delivery" type="radio" className="radio radio-xs checked:radio-primary ml-auto" />
									</label>
								</fieldset>
							</div>
						</div>

						<div className="card border">
							<div className="card-body">
								<h3 className="font-bold">Delivery shipping</h3>
								<fieldset className="fieldset gap-4">
									<legend className="sr-only">Address</legend>
									{Array.from({ length: 3 }).map((_, i) => (
										<label
											key={i}
											className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
											<input name="address" type="radio" className="radio radio-xs checked:radio-primary" />
											{/* <LuBox className="size-6" /> */}
											<div>
												<p className="font-bold truncate max-w-[400px]">
													(boys hostel) No 123 Agbro Lorem ipsum dolor, sit amet consectetur
													adipisicing elit. Ullam iusto nemo, illo ut porro laboriosam! Explicabo
													similique, deserunt aspernatur libero voluptate laborum maiores beatae eius
													molestias dolorum mollitia, repellendus ea!
												</p>
												<p className="text-xs opacity-50">Delivery fee: free</p>
											</div>
										</label>
									))}
								</fieldset>
							</div>
						</div>
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
								<h3 className="font-bold">Select payment method</h3>

								<fieldset className="fieldset grid-cols-2 gap-4">
									<legend className="sr-only">Shipping info</legend>
									<label className="flex items-center p-4 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
										<div>
											<LuCreditCard className="size-6" />
											<span>Debit/Credit Card</span>
										</div>
										<input
											name="payment-method"
											type="radio"
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
											className="radio radio-xs checked:radio-primary ml-auto"
										/>
									</label>
								</fieldset>
							</div>
						</div>

						<div className="card border">
							<div className="card-body">
								{/* generate pay-for-me link option display */}
								<div>
									<h3 className="font-bold">Generate Pay-for-me Link</h3>
									<p className="text-gray-500">
										* A unique link would be generated for you to share with the person you want to pay for you
									</p>
								</div>

								{/* Chopwell balance option display */}
								<div className="hidden">
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

								{/* virtual account option display */}
								<div className="hidden">
									<h3 className="font-bold">Checkout Virtual Account</h3>
									<p className="text-gray-500">* Virtual account would be generated in the next screen</p>
								</div>

								{/* choose card option display */}
								<div className="hidden">
									<h3 className="font-bold">Choose Card</h3>
									<fieldset className="fieldset gap-4">
										{Array.from({ length: 3 }).map((_, i) => (
											<label
												key={i}
												className="flex items-center px-4 py-2 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
												<input
													name="address"
													type="radio"
													className="radio radio-xs checked:radio-primary"
												/>
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
													<input
														type="text"
														className="w-[80%] grow text-xs"
														placeholder="3 digits"
														maxLength={3}
													/>

													<IconCardTick className="h-6 w-6 text-dark" />
												</div>
											</label>
										</div>

										<div className="form-control mb-5">
											<label className="label cursor-pointer items-center">
												<span className="label-text font-bold">Save card for future</span>

												<input
													type="checkbox"
													defaultChecked
													className="toggle toggle-xs checked:toggle-primary"
												/>
											</label>
										</div>
										<button className="btn btn-neutral btn-block">Done</button>
									</form>
								</div>

								{/* <fieldset className="fieldset grid-cols-2 gap-4">
									<legend className="sr-only">Shipping info</legend>
									<label className="flex items-center p-4 rounded-box gap-2/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
										<div>
											<LuCreditCard className="size-6" />
											<span>Debit/Credit Card</span>
										</div>
										<input
											name="payment-method"
											type="radio"
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
											className="radio radio-xs checked:radio-primary ml-auto"
										/>
									</label>
								</fieldset> */}
							</div>
						</div>

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
