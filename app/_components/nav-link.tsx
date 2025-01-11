"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PropsWithChildren } from "react";

type PropType = {
	path: string;
	className?: string | undefined;
	activeClassName?: string | undefined;
} & PropsWithChildren;

function NavLink({ path, children, className, activeClassName }: PropType) {
	const pathname = usePathname();

	return (
		<nav>
			<Link className={`${className} ${pathname === path ? activeClassName : ""}`} href={path}>
				{children}
			</Link>
		</nav>
	);
}

export default NavLink;
