"use client";

import IconCardTick from "@/icons/card-tick";
import IconDoubleCard from "@/icons/cards";
import useCheckoutStore from "@/store/checkout-store";

function AddNewCardForm() {
	const {
		card: {
			new: { cardNumber, expiryDate, cvc, saveForFuture },
		},
		setNewCardNumber,
		setNewCardCVV,
		setNewCardExpiryDate,
		setNewCardSaveForFuture,
	} = useCheckoutStore();

	return (
		<form className="" action="">
			<fieldset className="fieldset">
				<div className="label">
					<span className="label-text-alt">Card Number</span>
				</div>
				<div className="input flex items-center gap-2">
					<input
						type="text"
						className="text-xs"
						placeholder="1234 5678 8908 7654"
						value={cardNumber}
						onChange={(e) => setNewCardNumber(e.target.value)}
					/>

					<IconDoubleCard className="h-6 w-6 " />
				</div>
			</fieldset>

			<div className="flex gap-5 justify-between items-center mb-5">
				<fieldset className="fieldset">
					<div className="label">
						<span className="label-text-alt">Expiry Date</span>
					</div>

					<input
						type="text"
						className="input text-xs"
						placeholder="MM/YY"
						maxLength={5}
						value={expiryDate}
						onChange={(e) => setNewCardExpiryDate(e.target.value)}
					/>
				</fieldset>
				<fieldset className="fieldset">
					<div className="label">
						<span className="label-text-alt">CVC/CVV</span>
					</div>
					<div className="input flex items-center gap-2">
						<input
							type="text"
							className="w-[80%] grow text-xs"
							placeholder="3 digits"
							maxLength={3}
							value={cvc}
							onChange={(e) => setNewCardCVV(e.target.value)}
						/>

						<IconCardTick className="h-6 w-6 text-dark" />
					</div>
				</fieldset>
			</div>

			<div className="form-control">
				<label className="label cursor-pointer items-center">
					<span className="label-text font-bold">Save card for future</span>

					<input
						type="checkbox"
						checked={saveForFuture}
						onChange={() => setNewCardSaveForFuture(!saveForFuture)}
						className="toggle toggle-xs checked:toggle-primary"
					/>
				</label>
			</div>
		</form>
	);
}

export default AddNewCardForm;
