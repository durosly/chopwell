"use client";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { match } from "path-to-regexp";

function NextTopLoaderWrapper() {
	const pathname = usePathname();
	const darkRoutes = [
		"/admin",
		"/admin/*path",
		"/dashboard",
		"/dashboard/*path",
		"/login",
		"/signup",
	];

	if (darkRoutes.some((route) => match(route)(pathname))) {
		return <NextTopLoader color="var(--color-primary)" />;
	}

	return <NextTopLoader color="var(--color-secondary)" />;
}

export default NextTopLoaderWrapper;
