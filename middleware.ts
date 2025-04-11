import NextAuth from "next-auth";
import nextAuthMiddlewareConfig from "@/auth.config.middleware";

const { auth } = NextAuth(nextAuthMiddlewareConfig);

export default auth((req) => {
	const isLoggedIn = !!req.auth;
	const pathname = req.nextUrl.pathname;
	const isAdmin = req.auth?.user.is_admin;
	// console.log(req.auth);

	if (!isLoggedIn) {
		return Response.redirect(new URL(`/login?nextUrl=${pathname}`, req.nextUrl));
	}

	if (
		!pathname.startsWith("/api") &&
		!pathname.startsWith("/dashboard") &&
		isLoggedIn &&
		isAdmin
	) {
		// TODO: check if this is an admin user
		console.log("dashboaord redirect");
		return Response.redirect(new URL("/dashboard", req.nextUrl));
	}

	if (pathname.startsWith("/dashboard") && !isAdmin) {
		// redirect to landing page is user is not an admin
		console.log("not dashboard");
		return Response.redirect(new URL("/", req.nextUrl));
	}

	// if api route but not logged in
	// if (pathname.startsWith("/api") && !isLoggedIn) {
	// 	return Response.json({ message: "Unathorized access" }, { status: 401 });
	// }

	// if admin api but not admin
	if (pathname.startsWith("/api/admin") && !isAdmin) {
		return Response.json({ message: "Unathorized access" }, { status: 401 });
	}

	console.log("middleware fired...");
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		// "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		// "/(api|trpc)(.*)",
		"/dashboard/:path*",
		"/user/:path*",
		"/api/admin/:path*",
		"/api/auth/user/:path*",
	],
};
