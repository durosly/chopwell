import IconCardTick from "@/icons/card-tick";
import IconDoubleCard from "@/icons/cards";
import IconCheckBoxActive from "@/icons/checkbox-active";
import IconCheckBoxInactive from "@/icons/checkbox-inactive";

function AddNewCardPage() {
	return (
		<div className="">
			<div className="flex flex-wrap items-center justify-between gap-5 px-3 mb-5 py-4">
				<h2 className="text-xl font-bold capitalize">Add new card</h2>
				<button className="btn btn-xs btn-square border-none">✕</button>
			</div>

			<form className="px-3" action="">
				<label className="form-control">
					<div className="label">
						<span className="label-text-alt">Card Number</span>
					</div>
					<div className="input bg-neutral flex items-center gap-2">
						<input type="text" className="grow text-xs" placeholder="1234 5678 8908 7654" />

						<IconDoubleCard className="h-6 w-6 " />
					</div>
				</label>

				<div className="flex gap-5 justify-between items-center mb-5">
					<label className="">
						<div className="label">
							<span className="label-text-alt">Expiry Date</span>
						</div>

						<input type="text" className="input bg-neutral text-xs" placeholder="MM/YY" />
					</label>
					<label className="">
						<div className="label">
							<span className="label-text-alt">CVC/CVV</span>
						</div>
						<div className="input bg-neutral flex items-center gap-2">
							<input type="text" className="w-[80%] grow text-xs bg-red-800" placeholder="3 digits" />

							<IconCardTick className="h-6 w-6 text-dark" />
						</div>
					</label>
				</div>

				<div className="form-control mb-5">
					<label className="label cursor-pointer items-center">
						<span className="label-text font-bold">Save card for future</span>
						<div className="swap">
							<input type="checkbox" defaultChecked className="checkbox hidden" />
							<IconCheckBoxActive className="w-5 h-5 text-primary rotate-180 swap-on" />
							<IconCheckBoxInactive className="w-5 h-5 swap-off" />
						</div>
					</label>
				</div>
				<button className="btn btn-primary btn-block rounded-full">Continue NG 2,500</button>
			</form>
		</div>
	);
}

export default AddNewCardPage;
