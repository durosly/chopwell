// path/to/ReactScanComponent

"use client";
// react-scan must be imported before react
import { scan } from "react-scan";
import { useEffect } from "react";

function ReactScan() {
	useEffect(() => {
		scan({
			enabled: true,
		});
	}, []);

	return <></>;
}

export default ReactScan;
