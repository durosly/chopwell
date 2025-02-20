"use client";
import Slider from "react-slick";
import { PropsWithChildren } from "react";

type CSliderProps = PropsWithChildren<{
	dots?: boolean;
	infinite?: boolean;
	arrows?: boolean;
	speed?: number;
	slidesToShow?: number;
	slidesToScroll?: number;
	className?: string | undefined;
}>;

const defaultSettings = {
	dots: true,
	infinite: true,
	arrows: false,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
};

function CSlider({ children, ...settingsProp }: CSliderProps) {
	const sliderSettings = { ...defaultSettings, ...settingsProp };
	return <Slider {...sliderSettings}>{children}</Slider>;
}

export default CSlider;
