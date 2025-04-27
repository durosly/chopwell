import type { NextAuthConfig } from "next-auth";

const nextAuthMiddlewareConfig: NextAuthConfig = {
	providers: [],
	session: { strategy: "jwt" },
	callbacks: {},
	pages: {
		signIn: "/login",
	},
	trustHost: process.env.NODE_ENV === "production",
};

export default nextAuthMiddlewareConfig;
