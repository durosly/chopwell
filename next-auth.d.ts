import type { DefaultSession, DefaultUser } from "next-auth";
import { UserType } from "./types";

export type ExtendedUser = DefaultSession["user"] & {
	type: UserType;
	is_admin: boolean;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}

	interface User extends DefaultUser {
		is_admin: boolean;
		firstname: string;
		lastname: string;
		type: UserType;
	}
}
