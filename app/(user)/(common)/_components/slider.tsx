"use client";
import Image from "next/image";
import Slider from "react-slick";

const settings = {
	dots: true,
	infinite: true,
	arrows: false,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,

	// className: "w-full h-[calc(100vh_-_200px)] aspect-video rounded-2xl overflow-hidden mb-4",
	// appendDots: (dots: ReactNode) => (
	// 	<div className="flex w-[80%] justify-center h-2 bg-[#DDDCDC] mx-auto rounded-full overflow-hidden">
	// 		{dots}
	// 	</div>
	// ),

	// customPaging: () => <a className="bg-dark flex-1">&nbsp;</a>,
};

const dummyImages = [
	"https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
	"https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
	"https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
	"https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
];

function ImageSlider() {
	return (
		<>
			<div className="mb-10 flex-1">
				<Slider
					{...settings}
					// className="w-full h-[calc(100vh_-_200px)] aspect-video rounded-2xl overflow-hidden mb-4"
				>
					{dummyImages.map((img, i) => (
						<div key={i} className="px-4">
							<div className="relative w-full h-full max-h-[400px] aspect-video rounded-2xl overflow-hidden">
								<Image
									src={img}
									// width={300}
									// height={220}
									className="object-cover"
									fill
									alt=""
									sizes="(min-width: 1480px) 1485px, calc(106.47vw - 68px)"
								/>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</>
	);
}

export default ImageSlider;
