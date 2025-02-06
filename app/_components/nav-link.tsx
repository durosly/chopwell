"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type PropType = {
	path: string;
	className?: string | undefined;
	activeClassName?: string | undefined;
} & PropsWithChildren;

function NavLink({ path, children, className, activeClassName }: PropType) {
	const pathname = usePathname();

	return (
		<Link
			// className={`${className} ${pathname === path ? activeClassName : ""}`}
			className={cn(className, pathname === path ? activeClassName : "")}
			href={path}>
			{children}
		</Link>
	);
}

export default NavLink;
