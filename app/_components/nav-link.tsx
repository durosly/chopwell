"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type PropType = {
	path: string;
	className?: string | undefined;
	activeClassName?: string | undefined;
	exact?: boolean;
} & PropsWithChildren;

function NavLink({ path, children, className, activeClassName, exact }: PropType) {
	const pathname = usePathname();
	const active = exact ? pathname === path : pathname.startsWith(path);

	return (
		<Link
			// className={`${className} ${pathname === path ? activeClassName : ""}`}
			className={cn(className, active ? activeClassName : "")}
			href={path}>
			{children}
		</Link>
	);
}

export default NavLink;
