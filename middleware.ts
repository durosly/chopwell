import NextAuth from "next-auth";
import nextAuthMiddlewareConfig from "@/auth.config.middleware";
import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/next";
import { match } from "path-to-regexp";

const { auth } = NextAuth(nextAuthMiddlewareConfig);

const aj = arcjet({
	key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
	characteristics: ["ip.src"], // track requests by IP address
	rules: [
		detectBot({
			mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
			// Block all bots except the following
			allow: [
				"CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
				// Uncomment to allow these other common bot categories
				// See the full list at https://arcjet.com/bot-list
				"CATEGORY:MONITOR", // Uptime monitoring services
				"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
			],
		}),

		slidingWindow({
			mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
			interval: 60, // 60 second sliding window
			max: 100, // allow a maximum of 100 requests
		}),

		// Protect against common attacks with Arcjet Shield
		shield({
			mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
		}),
	],
});

const protectedRoutes = [
	"/dashboard/*path",
	"/user/*path",
	"/api/admin/*path",
	"/api/auth/user/*path",
];

export const authMiddleware = auth(async (req) => {
	const isLoggedIn = !!req.auth;
	const pathname = req.nextUrl.pathname;
	const isAdmin = req.auth?.user.is_admin;
	const isProtectedRoute = protectedRoutes.some((route) => match(route)(pathname));
	// console.log(req.auth?.user);
	// console.log(isLoggedIn, isAdmin);

	const decision = await aj.protect(req);

	// Bots not in the allow list will be blocked
	if (decision.isDenied()) {
		return Response.json({ error: "Forbidden" }, { status: 403 });
	}

	if (isProtectedRoute && !isLoggedIn) {
		if (pathname.startsWith("/api")) {
			return Response.json(
				{ message: "Unathorized access. Log in to continue." },
				{ status: 401 }
			);
		}

		return Response.redirect(new URL(`/login?nextUrl=${pathname}`, req.nextUrl));
	}

	if (
		!pathname.startsWith("/api") &&
		!pathname.startsWith("/dashboard") &&
		isLoggedIn &&
		isAdmin
	) {
		return Response.redirect(new URL("/dashboard", req.nextUrl));
	}

	if (pathname.startsWith("/dashboard") && !isAdmin) {
		return Response.redirect(new URL("/", req.nextUrl));
	}

	// if api route but not logged in
	if (pathname.startsWith("/api/auth/user") && !isLoggedIn) {
		return Response.json({ message: "Unathorized access" }, { status: 401 });
	}

	// if admin api but not admin
	if (pathname.startsWith("/api/admin") && !isAdmin) {
		return Response.json({ message: "Unathorized access" }, { status: 401 });
	}

	// console.log("middleware fired...");
});

export default authMiddleware;

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
		// "/dashboard/:path*",
		// "/user/:path*",
		// "/api/admin/:path*",
		// "/api/auth/user/:path*",
	],
};
