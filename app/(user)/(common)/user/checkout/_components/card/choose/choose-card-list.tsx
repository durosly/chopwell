"use client";

import { getUserSavedCards } from "@/api";
import { handleError } from "@/lib/handleError";
// import useCheckoutStore from "@/store/checkout-store";
import { useQuery } from "@tanstack/react-query";
import { LuBadgeAlert } from "react-icons/lu";

function ChooseCardList() {
	// const { card: checkoutCard, setCardExisting } = useCheckoutStore();
	const { isPending, isLoading, isError, data, error } = useQuery({
		queryKey: ["choose-card-list"],
		queryFn: () => getUserSavedCards(),
	});

	if (isPending) {
		return (
			<>
				<h3 className="text-gray-500 text-xs mb-2">Loading...</h3>
				<div className="flex flex-col gap-4">
					{Array.from({ length: 3 }).map((_, i) => (
						<div
							key={i}
							className="flex items-center flex-1 py-2 px-4 border rounded-box">
							<div className="size-6 rounded-full skeleton">
								&nbsp;
							</div>
							<div className="flex-1">
								<p className="font-bold truncate max-w-[400px] mb-2 skeleton">
									&nbsp;
								</p>
								<p className="h-3 w-10 opacity-50 skeleton">
									&nbsp;
								</p>
							</div>
						</div>
					))}
				</div>
			</>
		);
	}

	if (isError) {
		return (
			<div role="alert" className="alert alert-outline">
				<LuBadgeAlert className="size-8 shrink-0" />
				<div>
					<h3 className="font-bold">Notice</h3>
					<span className="text-xs">{handleError(error)}</span>
				</div>
			</div>
		);
	}

	return (
		<>
			<h3 className="text-gray-500 text-xs mb-2">Choose Card</h3>

			<fieldset className="fieldset gap-4">
				{data.cards.map(
					(card: {
						_id: string;
						cardNumber: string;
						cardType: string;
					}) => (
						<label
							key={card._id}
							className="flex items-center px-4 py-2 rounded-box gap-2 bg-neutral/5 ring ring-neutral/20 has-checked:bg-primary/10 has-checked:text-primary has-checked:ring-primary/50">
							<input
								name="address"
								type="radio"
								className="radio radio-xs checked:radio-primary"
								// checked={checkoutCard.existing === card._id}
								// onChange={() => setCardExisting(card._id)}
							/>
							<div>
								<p className="font-bold truncate max-w-[400px]">
									{card.cardNumber}
								</p>
								<p className="text-xs opacity-50">
									{card.cardType}
								</p>
							</div>
						</label>
					)
				)}
			</fieldset>
			{isLoading && <p>Updating list...</p>}
		</>
	);
}

export default ChooseCardList;
