import Image from "next/image";

function ToppingsItems() {
	return (
		<div className="px-5">
			<h2 className="text-xl font-bold">All</h2>

			<ul className="grid grid-cols-1 gap-5">
				{Array(7)
					.fill(3)
					.map((_, i) => (
						<li key={i} className="flex gap-5 items-start">
							<div className="relative w-[117px] flex-none aspect-square rounded-3xl overflow-hidden">
								<Image
									src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
									alt="Burger"
									fill
									className="object-cover"
								/>
							</div>

							<div className="space-y-2">
								<h3 className="text-xl font-bold">Toast Cheese Sandwich</h3>
								<p className="text-[10px] text-[#3A3939]">
									Medium burger French fries Medium burger French fries Medium burger French fries Medium burger French fries
								</p>
								<div className="flex justify-between gap-5">
									<span className="font-bold ">NG 2,000</span>
									<button className="btn btn-xs btn-accent w-[117px]">Add</button>
									{/* <div className="flex bg-accent h-6 rounded-xl">
									<button className="h-full  flex items-center px-2 text-2xl">&#45;</button>
									<span className="flex items-center justify-center flex-1">1</span>
									<button className="h-full  flex items-center px-2 text-2xl">&#43;</button>
								</div> */}
								</div>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
}

export default ToppingsItems;
