"use client";

import useCheckoutStore, { Cart } from "@/store/checkout-store";
import commaNumber from "@/utils/comma-number";
import Link from "next/link";
import { useState } from "react";

function CartInfo({ cart: { title, total, items, percentage, _id, note, schedule } }: { cart: Cart }) {
	const [showCartItemInfo, setShowCartItemInfo] = useState(false);
	const [showAddedInfo, setShowAddedInfo] = useState(false);
	const { setNote, setSchedule } = useCheckoutStore();

	return (
		<>
			<h3 className="font-bold">{title}</h3>
			<div className="flex justify-between flex-wrap">
				<p className="text-xs">
					Total:{" "}
					<span className="text-gray-500">
						<span>{commaNumber(total)}</span>({percentage}%)
					</span>
				</p>
				<button className="cursor-pointer text-xs" onClick={() => setShowCartItemInfo((prev) => !prev)}>
					{showCartItemInfo ? "hide items" : "show items"}
				</button>
			</div>
			{showCartItemInfo && (
				<ul className="list mb-5">
					{items.map((item, j) => (
						<li key={item._id} className="list-row py-2">
							<div className="font-thin tabular-nums">{(1 + j).toString().padStart(2, "0")}.</div>
							<div className="flex flex-col">
								<Link className="link" href="/product/1">
									{item.name}
								</Link>{" "}
								<span className="text-gray-500 text-xs">
									(<span>{commaNumber(item.price)}</span> x <span>{item.quantity}</span> ={" "}
									<span>{commaNumber(item.total)}</span>)
								</span>
							</div>
						</li>
					))}
				</ul>
			)}
			<div>
				<fieldset className="fieldset">
					<legend className="fieldset-legend sr-only">Schedule delivery</legend>
					<label className="fieldset-label">
						<span>Schedule Delivery</span>
						<input
							type="checkbox"
							checked={showAddedInfo}
							onChange={() => setShowAddedInfo((prev) => !prev)}
							className="toggle checked:toggle-primary"
						/>
					</label>
				</fieldset>
				{showAddedInfo && (
					<>
						<fieldset className="fieldset">
							<legend className="fieldset-legend sr-only">Delivery Date</legend>
							<input
								type="datetime-local"
								className="input"
								value={schedule}
								onChange={(e) => setSchedule(e.target.value, _id)}
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
								value={note}
								onChange={(e) => setNote(e.target.value, _id)}
								placeholder="Type in your note..."
								maxLength={500}
							/>
						</fieldset>
					</>
				)}
			</div>
		</>
	);
}

export default CartInfo;
