"use client";
import dynamic from "next/dynamic";

const LoadingCartAnimation = dynamic(() => import("./loading-cart"), {
	ssr: false,
});

function LoadAnimationWrapper() {
	return <LoadingCartAnimation />;
}

export default LoadAnimationWrapper;
