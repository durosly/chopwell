"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./bottom-nav";

function BottomNavWrapper() {
	const pathname = usePathname();
	const exceptions = ["/cart", "/user/checkout"];

	if (exceptions.includes(pathname)) return null;

	return <BottomNav />;
}

export default BottomNavWrapper;
