"use client";

import { useRef } from "react";
import { Player } from "@lordicon/react";
import { useEffect } from "react";

function IconsHandler({ icon }: { icon: string | object }) {
	const playerRef = useRef(null);

	useEffect(() => {
		// @ts-expect-error: not added lordicon type
		playerRef.current?.playFromBeginning();
	}, []);

	return (
		<Player
			ref={playerRef}
			size={80}
			icon={icon}
			colors="primary:var(--color-primary),secondary:var(--color-secondary)"
			// @ts-expect-error: not added lordicon type
			onComplete={() => playerRef.current?.playFromBeginning()}
		/>
	);
}

export default IconsHandler;
