import IconArrowLeft from "@/icons/arrow-left";
import Image from "next/image";
import Link from "next/link";

function ToastDisplay() {
	return (
		<div className="flex items-center gap-2 bg-success sticky bottom-[73px] left-0 right-0 p-3 text-secondary mt-2">
			<div className="flex items-center gap-1">
				<div className="relative w-10 h-10 rounded-full overflow-hidden">
					<Image src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Burger" fill className="object-cover" />
				</div>
				<div>
					<h3 className="font-bold">Your order</h3>
					<p className="text-[12px]">Pick-up starts at 1:00 PM today</p>
				</div>
			</div>
			<Link className="ml-auto rotate-180" href="/orders/1">
				<IconArrowLeft className="w-5 h-5" />
			</Link>
		</div>
	);
}

export default ToastDisplay;
