"use client";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

function ToastWrapper() {
	const [position, setPosition] = useState<
		"top-right" | "bottom-right" | "top-left" | "bottom-left"
	>("top-right");

	useEffect(() => {
		function updatePosition() {
			if (window.innerWidth > 768) {
				setPosition("bottom-right");
			} else {
				setPosition("top-right");
			}
		}
		updatePosition();
		window.addEventListener("resize", updatePosition);

		return () => {
			window.removeEventListener("resize", updatePosition);
		};
	}, []);
	return <Toaster richColors={true} position={position} />;
}

export default ToastWrapper;
