import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "./data/user";
import UserModel from "./models/user";
import { UserType } from "./types";
import connectMongo from "./lib/connectMongo";
import handleCartMerge from "./actions/handle-cart-merge";

class InvalidLoginError extends CredentialsSignin {
	// code = "Invalid identifier or password"
	constructor(code: string) {
		super();
		this.code = code;
	}
}

const nextAuthConfig: NextAuthConfig = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
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

				// console.log("Credentails");
				// console.log(credentials);
				// console.log({ user });

				if (!user) {
					// No user found, so this is their first attempt to login
					// Optionally, this is also the place you could do a user registration
					throw new InvalidLoginError("Invalid credentials.");
				}

				if (!user.password)
					throw new InvalidLoginError(
						"Invalid credentials. You probably used google auth"
					);

				const valid = await bcrypt.compare(
					credentials.password as string,
					user.password
				);

				if (!valid) throw new InvalidLoginError("Invalid credentials.");

				// return user object with their profile data
				return user;
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 3 * 24 * 3600 /** 3 days */,
		updateAge: 2 * 24 * 3600 /** 2 days */,
	},
	debug: process.env.NODE_ENV !== "production",
	callbacks: {
		async signIn({ account, profile, user }) {
			console.log("...Signin callback...");
			console.log({ account });
			console.log({ profile });
			console.log({ user });
			if (account && account.provider === "google" && profile) {
				const userExist = await getUserByEmail(profile.email as string);

				if (!userExist) {
					// TODO: user background job to speed up application
					await UserModel.create({
						firstname: profile?.given_name,
						lastname: profile?.family_name,
						emailVerified: Date.now(),
						auth_method: "google-auth",
						email: profile.email,
					});
				}
			}

			// TODO: user background job to speedup application
			await handleCartMerge(user.email as string);

			return true;
		},
		async authorized({ auth }) {
			if (!auth?.user) return false;

			const userId = auth?.user.id;

			if (!userId) return false;

			await connectMongo();
			const user = await UserModel.findById(userId);

			if (!user) return false;

			if (user.disabled) return false;

			return true;
		},
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
		async jwt({ token, user, account, profile }) {
			if (user) {
				token.name = `${user.firstname} ${user.lastname}`;
				token.firstname = user.firstname;
				token.lastname = user.lastname;
				token.type = user.type;
				token.is_admin = user.is_admin;
				token.id = user.id;
			}

			if (account && account.provider === "google" && profile) {
				const userExist = await getUserByEmail(profile.email as string);

				if (userExist) {
					token.name = `${userExist.firstname} ${userExist.lastname}`;
					token.firstname = userExist.firstname;
					token.lastname = userExist.lastname;
					token.type = userExist.type;
					token.is_admin = userExist.is_admin;
					token.id = userExist.id;
				} else {
					token.name = `${profile.given_name} ${profile.family_name}`;
					token.firstname = profile.given_name;
					token.lastname = profile.family_name;
					token.type = "customer";
					token.is_admin = false;
				}
			}

			return token;
		},
	},
	pages: {
		signIn: "/login",
	},
	trustHost: process.env.NODE_ENV === "production",
};

export default nextAuthConfig;
