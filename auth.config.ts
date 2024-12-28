import type { NextAuthConfig } from "next-auth";

const nextAuthConfig: NextAuthConfig = {
	providers: [],

	pages: {
		signIn: "/login",
	},
};

export default nextAuthConfig;
