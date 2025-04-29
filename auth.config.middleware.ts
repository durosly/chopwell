import type { NextAuthConfig } from "next-auth";
import { UserType } from "./types";

const nextAuthMiddlewareConfig: NextAuthConfig = {
	providers: [],
	session: {
		strategy: "jwt",
		maxAge: 3 * 24 * 3600 /** 3 days */,
		updateAge: 2 * 24 * 3600 /** 2 days */,
	},
	debug: process.env.NODE_ENV !== "production",
	callbacks: {
		async session({ session, token }) {
			if (session.user && token.id) {
				session.user.id = token.id as string;
			}

			if (session.user) {
				session.user.type = token.type as UserType;
				session.user.is_admin = token.is_admin as boolean;
				session.user.firstname = token.firstname as string;
				session.user.lastname = token.lastname as string;
			}

			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.name = `${user.firstname} ${user.lastname}`;
				token.firstname = user.firstname;
				token.lastname = user.lastname;
				token.type = user.type;
				token.is_admin = user.is_admin;
				token.id = user.id;
			}

			return token;
		},
	},
	pages: {
		signIn: "/login",
	},
	trustHost: true,
};

export default nextAuthMiddlewareConfig;
