"use client";

import { Player } from "@lordicon/react";
import { useEffect, useRef } from "react";
import trolleyJump from "@/public/animations/trolley-jump.json";

function LoadingCartAnimation() {
	const playerRef = useRef(null);

	useEffect(() => {
		playerRef.current?.playFromBeginning();
	}, []);

	return (
		<Player
			ref={playerRef}
			size={96}
			icon={trolleyJump}
			colors="primary:#000,secondary:#800808"
			onComplete={() => playerRef.current?.playFromBeginning()}
		/>
	);
}

export default LoadingCartAnimation;
