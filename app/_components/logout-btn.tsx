"use client";

import { PropsWithChildren } from "react";
import { signOut } from "next-auth/react";

function LogoutButton({ className, children }: PropsWithChildren & { className?: string | undefined }) {
	return (
		<button onClick={() => signOut({ redirect: true, redirectTo: "/" })} className={className}>
			{children}
		</button>
	);
}

export default LogoutButton;
