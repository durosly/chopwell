"use client";

import { useEffect } from "react";

import { useState } from "react";

import { createPortal } from "react-dom";

function CustomPortal({ children }: { children: React.ReactNode }) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return <> {loaded && createPortal(children, document.body)}</>;
}

export default CustomPortal;
