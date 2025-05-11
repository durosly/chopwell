"use client";
import Image from "next/image";
import { useRef } from "react";
import Slider from "react-slick";

const settings = {
	dots: true,
	infinite: true,
	arrows: false,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 5000,
	className: "w-full rounded-2xl ",
};

const dummyImages = [
	"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function ImageSlider() {
	const sliderRef = useRef<Slider>(null);
	const next = () => {
		sliderRef.current?.slickNext();
	};
	const previous = () => {
		sliderRef.current?.slickPrev();
	};

	return (
		<div className="w-full">
			<div className="relative w-full">
				<button
					onClick={previous}
					className="absolute left-4 top-1/2 z-10 -translate-y-1/2 size-10 flex justify-center items-center cursor-pointer rounded-full bg-base-100/50 hover:bg-base-100/80 transition-colors duration-300"
					aria-label="Previous slide">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>
				<button
					onClick={next}
					className="absolute right-4 top-1/2 z-10 -translate-y-1/2 size-10 flex justify-center items-center cursor-pointer rounded-full bg-base-100/50 hover:bg-base-100/80 transition-colors duration-300"
					aria-label="Next slide">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>
				<div className="relative">
					<Slider ref={sliderRef} {...settings}>
						{dummyImages.map((img, i) => (
							<div key={i} className="px-2 sm:px-4">
								<div className="relative w-full h-[350px] rounded-2xl overflow-hidden">
									<Image
										src={img}
										className="object-cover transition-transform duration-500 hover:scale-105"
										fill
										alt="Featured promotion"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
										priority={i === 0}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
								</div>
							</div>
						))}
					</Slider>
				</div>
			</div>
		</div>
	);
}

export default ImageSlider;
