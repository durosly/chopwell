import Image from "next/image";

function FeaturedItems() {
	return (
		<div className="mb-5">
			<div className="flex flex-wrap items-center justify-between gap-5 px-5 mb-2">
				<h2 className="text-xl font-bold">Featured Items</h2>
			</div>

			<div className="carousel carousel-center px-5 gap-2 py-3 w-full">
				{Array(7)
					.fill(2)
					.map((_, i) => (
						<div
							key={i}
							className="carousel-item shadow-md border-[0.5px] flex-col rounded-2xl overflow-hidden w-[133px]">
							<div className="relative h-[150px] w-full">
								<Image
									src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
									alt="Burger"
									fill
									className="object-cover"
								/>
							</div>
							<div className="p-2 space-y-1">
								<p>
									<span className="font-bold text-xs">
										NG 2,000
									</span>{" "}
									<span className="text-[10px]">
										{" "}
										&bull;
									</span>{" "}
									<span className="text-[10px]">
										320 Cal
									</span>
								</p>

								<p className="text-[10px]">
									Medium burger French fries
								</p>

								<button className="btn btn-block btn-xs btn-accent">
									Add
								</button>
								{/* <div className="flex bg-accent h-6 rounded-xl">
									<button className="h-full  flex items-center px-2 text-2xl">&#45;</button>
									<span className="flex items-center justify-center flex-1">1</span>
									<button className="h-full  flex items-center px-2 text-2xl">&#43;</button>
								</div> */}
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default FeaturedItems;
