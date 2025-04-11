import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";
import TopupForm from "./_components/topup-form";
// import IconCardTick from "@/icons/card-tick";
// import IconDoubleCard from "@/icons/cards";
// import IconCheckBoxActive from "@/icons/checkbox-active";
// import IconCheckBoxInactive from "@/icons/checkbox-inactive";

function TopUpPage() {
	return (
		<>
			<div className="flex items-center mt-5 mb-10 gap-5 pr-10">
				<BackButton className="btn btn-sm btn-ghost">
					<IconArrowLeft className="w-6 h-6" />
				</BackButton>
				<h2 className="text-2xl font-bold text-center flex-1">Top Up</h2>
			</div>

			<TopupForm />

			{/* Open the modal using document.getElementById('ID').showModal() method */}
			{/* <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button> */}
			{/* <dialog id="my_modal_2" className="modal modal-open">
				<div className="modal-box">
					<form method="dialog">
						
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<>
						<div className="">
							<div className="flex flex-wrap items-center justify-between gap-5 px-3 mb-5 py-4">
								<h2 className="text-xl font-bold capitalize">
									Add new card
								</h2>
							</div>

							<form className="px-3" action="">
								<label className="form-control">
									<div className="label">
										<span className="label-text-alt">
											Card Number
										</span>
									</div>
									<div className="input bg-neutral flex items-center gap-2">
										<input
											type="text"
											className="grow text-xs"
											placeholder="1234 5678 8908 7654"
										/>

										<IconDoubleCard className="h-6 w-6 " />
									</div>
								</label>

								<div className="flex gap-5 justify-between items-center mb-5">
									<label className="">
										<div className="label">
											<span className="label-text-alt">
												Expiry
												Date
											</span>
										</div>

										<input
											type="text"
											className="input bg-neutral text-xs"
											placeholder="MM/YY"
										/>
									</label>
									<label className="">
										<div className="label">
											<span className="label-text-alt">
												CVC/CVV
											</span>
										</div>
										<div className="input bg-neutral flex items-center gap-2">
											<input
												type="text"
												className="w-[80%] grow text-xs bg-red-800"
												placeholder="3 digits"
											/>

											<IconCardTick className="h-6 w-6 text-dark" />
										</div>
									</label>
								</div>

								<div className="form-control mb-5">
									<label className="label cursor-pointer items-center">
										<span className="label-text font-bold">
											Save card
											for future
										</span>
										<div className="swap">
											<input
												type="checkbox"
												defaultChecked
												className="checkbox hidden"
											/>
											<IconCheckBoxActive className="w-5 h-5 text-primary rotate-180 swap-on" />
											<IconCheckBoxInactive className="w-5 h-5 swap-off" />
										</div>
									</label>
								</div>
								<button className="btn btn-primary btn-block rounded-full">
									Continue NG 2,500
								</button>
							</form>
						</div>
					</>
					<p className="py-4 text-xs text-gray-500">
						Press ESC key or click outside to close
					</p>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog> */}
		</>
	);
}

export default TopUpPage;
