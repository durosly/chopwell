"use client";

// import useCheckoutStore from "@/store/checkout-store";
import { LuCreditCard, LuPlus } from "react-icons/lu";
import ChooseCardList from "./choose/choose-card-list";
import AddNewCardForm from "./new/form";

function CardPaymentInfo() {
	// const { card, setCardOption } = useCheckoutStore();

	return (
		<div className="tabs tabs-border">
			<label className="tab">
				<input
					type="radio"
					name="card-choice"
					// checked={card.options === "existing"} onChange={() => setCardOption("existing")}
				/>
				<LuCreditCard className="size-4 me-2" />
				<span>Cards</span>
			</label>
			<div className="tab-content pt-4">
				<ChooseCardList />
			</div>

			<label className="tab">
				<input
					type="radio"
					name="card-choice"
					// checked={card.options === "new"} onChange={() => setCardOption("new")}
				/>
				<LuPlus className="size-4 me-2" />
				<span>New Card</span>
			</label>
			<div className="tab-content pt-4">
				<AddNewCardForm />
			</div>
		</div>
	);
}

export default CardPaymentInfo;
