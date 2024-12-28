import nextAuthConfig from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(nextAuthConfig);

export default auth((req) => {
	const isLoggedIn = !!req.auth;
	const pathname = req.nextUrl.pathname;
	// console.log(req.token)

	if (pathname.startsWith("/admin") && isLoggedIn) {
		// TODO: check if this is an admin user
		return Response.redirect(new URL("/dashboard", req.nextUrl));
	}
	if (!req.auth && req.nextUrl.pathname !== "/login") {
		// const newUrl = new URL("/login", req.nextUrl.origin);
		// return Response.redirect(newUrl);
	}

	console.log("middleware fired...");
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
