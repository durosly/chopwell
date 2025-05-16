"use client";

import { useSession } from "next-auth/react";
import { LuSettings, LuTrash2 } from "react-icons/lu";
import CartDisplay from "./popup/cart-display";
import { useClearCart } from "@/hooks/useCart";
import PopupCartSummary from "./popup/popup-cart-summary";
import UserAddressHandler from "./popup/user-address-handler";

function PopupCartListing() {
	const { data: session } = useSession();

	const { mutate: clearCart, isPending: isClearingCart } = useClearCart({
		onSuccess: () => {},
	});

	return (
		<div>
			<div className="flex justify-between gap-2 mb-2">
				<button
					onClick={() => clearCart()}
					disabled={isClearingCart}
					className="btn btn-xs btn-ghost">
					<LuTrash2 className="size-3 sm:size-5" />
					Remove All
				</button>
				{session ? (
					<button className="btn btn-xs  btn-ghost">
						Order Settings
						<LuSettings className="size-3 sm:size-5" />
					</button>
				) : (
					<span></span>
				)}
			</div>

			<CartDisplay />

			<div className="my-2 bg-success/10 text-center border-l-4 border-success">
				<p className="text-sm">
					Add more deliciouse meal to arounse you taste buds
				</p>
			</div>
			<div>
				{session && <UserAddressHandler />}

				<PopupCartSummary />
			</div>
			<div className="flex justify-between join">
				<button className="btn btn-lg join-item">Book Order</button>
				<button className="btn btn-lg btn-primary flex-1 flex-col gap-0 join-item">
					<span>Place Order</span>
					<span className="text-[10px]">About to pay N2500</span>
				</button>
			</div>
		</div>
	);
}

export default PopupCartListing;
