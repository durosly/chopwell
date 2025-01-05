import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "./data/user";
import UserModel from "./models/user";
import { UserType } from "./types";

class InvalidLoginError extends CredentialsSignin {
	// code = "Invalid identifier or password"
	constructor(code: string) {
		super();
		this.code = code;
	}
}

const nextAuthConfig: NextAuthConfig = {
	providers: [
		Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
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

				console.log("Credentails");
				console.log(credentials);
				console.log({ user });

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
		async signIn({ account, profile }) {
			console.log("...Signin callback...");
			console.log({ account });
			console.log({ profile });
			if (account && account.provider === "google" && profile) {
				const userExist = await getUserByEmail(profile.email as string);

				if (!userExist) {
					await UserModel.create({
						firstname: profile?.given_name,
						lastname: profile?.family_name,
						emailVerified: Date.now(),
						auth_method: "google-auth",
						email: profile.email,
					});
				}
				// return profile.email_verified && profile.email.endsWith("@example.com")
			}

			return true;
		},
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
	pages: {
		signIn: "/login",
	},
};

export default nextAuthConfig;
