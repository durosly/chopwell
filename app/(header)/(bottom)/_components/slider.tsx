import Image from "next/image";
import React from "react";

function ImageSlider() {
	return (
		<>
			<div className="px-5 mb-10">
				<div className="carousel w-full aspect-video rounded-2xl mb-4">
					<div id="item1" className="carousel-item w-full">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
							width={300}
							height={220}
							className="w-full"
							alt=""
						/>
					</div>
					<div id="item2" className="carousel-item w-full">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
							width={300}
							height={220}
							alt=""
							className="w-full"
						/>
					</div>
					<div id="item3" className="carousel-item w-full">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
							width={300}
							height={220}
							alt=""
							className="w-full"
						/>
					</div>
					<div id="item4" className="carousel-item w-full">
						<Image
							src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
							width={300}
							height={220}
							className="w-full"
							alt=""
						/>
					</div>
				</div>
				<div className="flex w-[80%] justify-center h-2 bg-[#DDDCDC] mx-auto rounded-full overflow-hidden">
					<a href="#item1" className="bg-dark flex-1">
						&nbsp;
					</a>
					<a href="#item2" className="flex-1">
						&nbsp;
					</a>
					<a href="#item3" className="flex-1">
						&nbsp;
					</a>
					<a href="#item4" className="flex-1">
						&nbsp;
					</a>
				</div>
			</div>
		</>
	);
}

export default ImageSlider;
