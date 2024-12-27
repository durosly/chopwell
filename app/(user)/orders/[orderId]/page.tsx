import IconArrowLeft from "@/icons/arrow-left";
import IconCheck from "@/icons/check";
import IconCopy from "@/icons/copy";
import React from "react";

function OrderDetails() {
	return (
		<div className="p-2">
			<div className="flex flex-wrap items-center justify-between gap-5 px-5 mb-5 py-4">
				<button className="btn btn-xs btn-square border-none">
					<IconArrowLeft />
				</button>
				<h2 className="text-xl font-bold flex-1 text-center">Your Order</h2>
			</div>

			<div className="text-[12px] text-center">
				<h3 className="text-primary mb-3">Order status</h3>
				<div className="mb-5">
					<p className="mb-2">Order ID: </p>
					<button className="bg-neutral p-2 rounded flex items-center gap-1 mx-auto">
						<span className="font-bold">265435673</span>
						<div className="">
							<IconCopy className="w-4 h-4 text-[#C2C2C2]" />
						</div>
					</button>
				</div>

				<div>
					<p className="text-[#3A3939] mb-3">Order recieved</p>
					<ul className="flex gap-2 justify-center items-center">
						{Array(2)
							.fill(3)
							.map((_, i) => (
								<li key={i}>
									<span className="w-8 h-8 aspect-square rounded-full flex justify-center items-center bg-primary text-secondary">
										<IconCheck className="w-3 h-3" />
									</span>
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default OrderDetails;
