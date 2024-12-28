import NextAuth, { CredentialsSignin } from "next-auth";
import nextAuthConfig from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import { UserType } from "./types";

class InvalidLoginError extends CredentialsSignin {
	// code = "Invalid identifier or password"
	constructor(code: string) {
		super();
		this.code = code;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	...nextAuthConfig,
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;

				user = await getUserByEmail(credentials.email as string);

				if (!user) {
					// No user found, so this is their first attempt to login
					// Optionally, this is also the place you could do a user registration
					throw new InvalidLoginError("Invalid credentials.");
				}

				if (!user.password) throw new InvalidLoginError("Invalid credentials. You probably used google auth");

				const valid = await bcrypt.compare(credentials.password as string, user.password);

				if (!valid) throw new InvalidLoginError("Invalid credentials.");

				// return user object with their profile data
				return user;
			},
		}),
	],

	session: { strategy: "jwt" },
	debug: true,
	callbacks: {
		async session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}

			if (session.user) {
				session.user.type = token.type as UserType;
				session.user.is_admin = token.is_admin as boolean;
			}

			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.name = `${user.firstname} ${user.lastname}`;
				token.type = user.type;
				token.is_admin = user.is_admin;
			}

			return token;
		},
	},
});
