"use client";

import { Player } from "@lordicon/react";
import { useEffect, useRef } from "react";
import trolleyJump from "@/public/animations/trolley-jump.json";

function LoadingCartAnimation() {
	const playerRef = useRef(null);

	useEffect(() => {
		// @ts-expect-error: not added lordicon type
		playerRef.current?.playFromBeginning();
	}, []);

	return (
		<Player
			ref={playerRef}
			size={96}
			icon={trolleyJump}
			colors="primary:#000,secondary:#800808"
			// @ts-expect-error: not added lordicon type
			onComplete={() => playerRef.current?.playFromBeginning()}
		/>
	);
}

export default LoadingCartAnimation;
