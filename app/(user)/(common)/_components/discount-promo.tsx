import IconHeart from "@/icons/heart";
import IconStar from "@/icons/star";
import Image from "next/image";

function DiscountPromo() {
	return (
		<div className="mb-10">
			<div className="flex flex-wrap items-center justify-between gap-5 px-5 mb-5">
				<h2 className="text-xl font-bold">Super BIG: Enjoy 50% OFF</h2>
			</div>

			<div className="carousel carousel-center px-5 gap-2 py-3 w-full">
				<div className="carousel-item border border-base-300 flex-col rounded-box overflow-hidden">
					<div className="relative h-[200px] w-[80vw]">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
							alt="Burger"
							fill
							className="object-cover"
							sizes="80vw"
						/>
						<div className="absolute top-0 w-full flex justify-between p-4">
							<div>
								<span className="badge badge-sm badge-primary">
									50% OFF
								</span>
								<span className="badge badge-sm badge-primary">
									Support local
								</span>
							</div>
							<button className="btn btn-sm btn-square border-none bg-[#797373] text-secondary rounded-full p-1">
								<IconHeart />
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between p-2">
						<div className="space-y-2">
							<h3 className="font-bold">
								Hot Jollof Rice
							</h3>
							<p className="text-xs">NG O Delivery fee</p>
							<div className="flex gap-2 justify-between items-center text-xs font-bold">
								<div className="flex gap-1 items-center">
									<IconStar className="w-4 h-4 text-[#FFBB00]" />
									<span>3.5</span>
								</div>
								<p>10-25 min</p>
							</div>
						</div>
						<p className="font-bold">NG 2,000</p>
					</div>
				</div>
				<div className="carousel-item border border-base-300 flex-col rounded-box overflow-hidden">
					<div className="relative h-[200px] w-[80vw]">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
							alt="Burger"
							fill
							className="object-cover"
						/>
						<div className="absolute top-0 w-full flex justify-between p-4">
							<div>
								<span className="badge badge-sm badge-primary">
									50% OFF
								</span>
								<span className="badge badge-sm badge-primary">
									Support local
								</span>
							</div>
							<button className="btn btn-sm btn-square border-none bg-[#797373] text-secondary rounded-full p-1">
								<IconHeart />
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between p-2">
						<div className="space-y-2">
							<h3 className="font-bold">
								Hot Jollof Rice
							</h3>
							<p className="text-xs">NG O Delivery fee</p>
							<div className="flex gap-2 justify-between items-center text-xs font-bold">
								<div className="flex gap-1 items-center">
									<IconStar className="w-4 h-4 text-[#FFBB00]" />
									<span>3.5</span>
								</div>
								<p>10-25 min</p>
							</div>
						</div>
						<p className="font-bold">NG 2,000</p>
					</div>
				</div>
				<div className="carousel-item border border-base-300 flex-col rounded-box overflow-hidden">
					<div className="relative h-[200px] w-[80vw]">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
							alt="Burger"
							fill
							className="object-cover"
						/>
						<div className="absolute top-0 w-full flex justify-between p-4">
							<div>
								<span className="badge badge-sm badge-primary">
									50% OFF
								</span>
								<span className="badge badge-sm badge-primary">
									Support local
								</span>
							</div>
							<button className="btn btn-sm btn-square border-none bg-[#797373] text-secondary rounded-full p-1">
								<IconHeart />
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between p-2">
						<div className="space-y-2">
							<h3 className="font-bold">
								Hot Jollof Rice
							</h3>
							<p className="text-xs">NG O Delivery fee</p>
							<div className="flex gap-2 justify-between items-center text-xs font-bold">
								<div className="flex gap-1 items-center">
									<IconStar className="w-4 h-4 text-[#FFBB00]" />
									<span>3.5</span>
								</div>
								<p>10-25 min</p>
							</div>
						</div>
						<p className="font-bold">NG 2,000</p>
					</div>
				</div>
				<div className="carousel-item border border-base-300 flex-col rounded-box overflow-hidden">
					<div className="relative h-[200px] w-[80vw]">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
							alt="Burger"
							fill
							className="object-cover"
						/>
						<div className="absolute top-0 w-full flex justify-between p-4">
							<div>
								<span className="badge badge-sm badge-primary">
									50% OFF
								</span>
								<span className="badge badge-sm badge-primary">
									Support local
								</span>
							</div>
							<button className="btn btn-sm btn-square border-none bg-[#797373] text-secondary rounded-full p-1">
								<IconHeart />
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between p-2">
						<div className="space-y-2">
							<h3 className="font-bold">
								Hot Jollof Rice
							</h3>
							<p className="text-xs">NG O Delivery fee</p>
							<div className="flex gap-2 justify-between items-center text-xs font-bold">
								<div className="flex gap-1 items-center">
									<IconStar className="w-4 h-4 text-[#FFBB00]" />
									<span>3.5</span>
								</div>
								<p>10-25 min</p>
							</div>
						</div>
						<p className="font-bold">NG 2,000</p>
					</div>
				</div>
				<div className="carousel-item border border-base-300 flex-col rounded-box overflow-hidden">
					<div className="relative h-[200px] w-[80vw]">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
							alt="Burger"
							fill
							className="object-cover"
						/>
						<div className="absolute top-0 w-full flex justify-between p-4">
							<div>
								<span className="badge badge-sm badge-primary">
									50% OFF
								</span>
								<span className="badge badge-sm badge-primary">
									Support local
								</span>
							</div>
							<button className="btn btn-sm btn-square border-none bg-[#797373] text-secondary rounded-full p-1">
								<IconHeart />
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between p-2">
						<div className="space-y-2">
							<h3 className="font-bold">
								Hot Jollof Rice
							</h3>
							<p className="text-xs">NG O Delivery fee</p>
							<div className="flex gap-2 justify-between items-center text-xs font-bold">
								<div className="flex gap-1 items-center">
									<IconStar className="w-4 h-4 text-[#FFBB00]" />
									<span>3.5</span>
								</div>
								<p>10-25 min</p>
							</div>
						</div>
						<p className="font-bold">NG 2,000</p>
					</div>
				</div>
				<div className="carousel-item border border-base-300 flex-col rounded-box overflow-hidden">
					<div className="relative h-[200px] w-[80vw]">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
							alt="Burger"
							fill
							className="object-cover"
						/>
						<div className="absolute top-0 w-full flex justify-between p-4">
							<div>
								<span className="badge badge-sm badge-primary">
									50% OFF
								</span>
								<span className="badge badge-sm badge-primary">
									Support local
								</span>
							</div>
							<button className="btn btn-sm btn-square border-none bg-[#797373] text-secondary rounded-full p-1">
								<IconHeart />
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between p-2">
						<div className="space-y-2">
							<h3 className="font-bold">
								Hot Jollof Rice
							</h3>
							<p className="text-xs">NG O Delivery fee</p>
							<div className="flex gap-2 justify-between items-center text-xs font-bold">
								<div className="flex gap-1 items-center">
									<IconStar className="w-4 h-4 text-[#FFBB00]" />
									<span>3.5</span>
								</div>
								<p>10-25 min</p>
							</div>
						</div>
						<p className="font-bold">NG 2,000</p>
					</div>
				</div>
				<div className="carousel-item border border-base-300 flex-col rounded-box overflow-hidden">
					<div className="relative h-[200px] w-[80vw]">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
							alt="Burger"
							fill
							className="object-cover"
						/>
						<div className="absolute top-0 w-full flex justify-between p-4">
							<div>
								<span className="badge badge-sm badge-primary">
									50% OFF
								</span>
								<span className="badge badge-sm badge-primary">
									Support local
								</span>
							</div>
							<button className="btn btn-sm btn-square border-none bg-[#797373] text-secondary rounded-full p-1">
								<IconHeart />
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between p-2">
						<div className="space-y-2">
							<h3 className="font-bold">
								Hot Jollof Rice
							</h3>
							<p className="text-xs">NG O Delivery fee</p>
							<div className="flex gap-2 justify-between items-center text-xs font-bold">
								<div className="flex gap-1 items-center">
									<IconStar className="w-4 h-4 text-[#FFBB00]" />
									<span>3.5</span>
								</div>
								<p>10-25 min</p>
							</div>
						</div>
						<p className="font-bold">NG 2,000</p>
					</div>
				</div>
				<div className="carousel-item border border-base-300 flex-col rounded-box overflow-hidden">
					<div className="relative h-[200px] w-[80vw]">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
							alt="Burger"
							fill
							className="object-cover"
						/>
						<div className="absolute top-0 w-full flex justify-between p-4">
							<div>
								<span className="badge badge-sm badge-primary">
									50% OFF
								</span>
								<span className="badge badge-sm badge-primary">
									Support local
								</span>
							</div>
							<button className="btn btn-sm btn-square border-none bg-[#797373] text-secondary rounded-full p-1">
								<IconHeart />
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between p-2">
						<div className="space-y-2">
							<h3 className="font-bold">
								Hot Jollof Rice
							</h3>
							<p className="text-xs">NG O Delivery fee</p>
							<div className="flex gap-2 justify-between items-center text-xs font-bold">
								<div className="flex gap-1 items-center">
									<IconStar className="w-4 h-4 text-[#FFBB00]" />
									<span>3.5</span>
								</div>
								<p>10-25 min</p>
							</div>
						</div>
						<p className="font-bold">NG 2,000</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DiscountPromo;
