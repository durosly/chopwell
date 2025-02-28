"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./bottom-nav";

function BottomNavWrapper() {
	const pathname = usePathname();

	if (pathname === "/cart") return null;

	return <BottomNav />;
}

export default BottomNavWrapper;
