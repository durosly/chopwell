"use client";

import { useCartItemQuatityUpdate } from "@/hooks/useCart";
import { useState } from "react";
import { LuMinus } from "react-icons/lu";

import { LuPlus } from "react-icons/lu";

function UpdateCartItemQuantity({
	itemId,
	currentQuantity,
}: {
	itemId: string;
	currentQuantity: number;
}) {
	const [quantity, setQuantity] = useState(currentQuantity);

	function handleReduceQuantity() {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	}

	function handleIncreaseQuantity() {
		if (quantity < 10) {
			setQuantity((prev) => prev + 1);
		}
	}

	function onSuccess() {
		const popoverEl = document.getElementById(`quantity-${itemId}`);
		if (popoverEl?.hidePopover) {
			popoverEl.hidePopover(); // Native API
		}
	}

	const { isPending, mutate } = useCartItemQuatityUpdate({
		cartItemId: itemId,
		onSuccess,
	});

	function handleUpdateQuantity() {
		mutate({ quantity });
	}

	return (
		<div className="mt-2">
			<div className="join mb-2">
				<button
					disabled={isPending || quantity === 1}
					onClick={handleReduceQuantity}
					className="btn btn-sm btn-soft join-item">
					<LuMinus className="size-4" />
				</button>
				<input
					type="number"
					className="input input-sm input-bordered w-20 text-center join-item"
					readOnly
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}
				/>
				<button
					disabled={isPending || quantity === 10}
					onClick={handleIncreaseQuantity}
					className="btn btn-sm btn-soft join-item">
					<LuPlus className="size-4" />
				</button>
			</div>
			<button
				disabled={isPending || quantity === currentQuantity}
				onClick={handleUpdateQuantity}
				className="btn btn-sm btn-primary btn-block">
				Update
			</button>
		</div>
	);
}

export default UpdateCartItemQuantity;
