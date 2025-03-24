import type { NextAuthConfig } from "next-auth";

const nextAuthMiddlewareConfig: NextAuthConfig = {
	providers: [],
	session: { strategy: "jwt" },
	callbacks: {},
	pages: {
		signIn: "/login",
	},
};

export default nextAuthMiddlewareConfig;
