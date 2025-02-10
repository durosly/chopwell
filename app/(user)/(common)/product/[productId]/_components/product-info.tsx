import IconHeart from "@/icons/heart";

function ProductInfo() {
	return (
		<div className="relative bg-secondary rounded-2xl">
			<div className="flex flex-wrap items-center justify-between gap-5 px-5 mb-5 py-4">
				<h2 className="text-xl font-bold">Hot Jollof Rice</h2>
				<button className="btn btn-xs btn-square border-none">
					<IconHeart />
				</button>
			</div>

			<div className="px-2">
				<ul className="flex justify-center mb-5">
					<li className="flex-1 pr-2 flex flex-col justify-center text-center">
						<span className="text-xs text-[#2C2B2B">Delivery time</span>
						<span className="font-bold">10-25 mins</span>
					</li>
					<li className="flex-1 px-2 flex flex-col justify-center text-center border-x-[0.5px] border-[#C2C2C2]">
						<span className="text-xs text-[#2C2B2B">Rating</span>
						<span className="font-bold">3.5</span>
					</li>
					<li className="flex-1 px-2 flex flex-col justify-center text-center border-x-[0.5px] border-[#C2C2C2]">
						<span className="text-xs text-[#2C2B2B">Price Range</span>
						<span className="font-bold">NG 2,500</span>
					</li>
					<li className="flex-1 pl-2 flex flex-col justify-center text-center ">
						<span className="text-xs text-[#2C2B2B">Delivery fee</span>
						<span className="font-bold">NG 0</span>
					</li>
				</ul>

				<button className="btn btn-secondary btn-sm ">Show more</button>
			</div>
		</div>
	);
}

export default ProductInfo;
