import "server-only";

import { auth } from "@/auth";
import { handleError } from "@/lib/handleError";
import type { NextRequest } from "next/server";

type RouteParams<T = { [key: string]: string }> = {
	params: Promise<T>;
};

export function withAuth<T = { [key: string]: string }>(
	handler: (request: Request | NextRequest, context: RouteParams<T>) => Promise<Response>
) {
	return async (
		request: Request | NextRequest,
		context: RouteParams<T>
	): Promise<Response> => {
		try {
			const session = await auth();

			if (!session?.user?.id) {
				return Response.json({ message: "Unauthorized" }, { status: 401 });
			}

			// Proceed to original handler
			return await handler(request, context);
		} catch (error) {
			console.error(error);
			const message = handleError(error);
			return Response.json({ message }, { status: 500 });
		}
	};
}
