import SubtotalDisplay from "./subtotal-display";
import { LuBadgeInfo } from "react-icons/lu";
import Link from "next/link";

function CartSummary() {
	return (
		<>
			<h2 className="text-xl font-semibold uppercase mb-4">Cart Summary</h2>
			<div className="flex justify-between gap-2">
				<p>Subtotal</p>
				<p className="text-xl font-bold">
					<SubtotalDisplay />
				</p>
			</div>
			<p className="text-xs flex item-center gap-1 text-gray-500 mb-4">
				<LuBadgeInfo /> Delivery fee not included yet
			</p>
			<Link href={"/user/checkout"} className="btn btn-primary btn-block">
				Checkout (
				<SubtotalDisplay />)
			</Link>
		</>
	);
}

export default CartSummary;
