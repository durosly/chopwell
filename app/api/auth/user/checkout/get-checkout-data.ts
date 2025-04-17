"use server";
import "server-only";
import getCheckoutDataAction from "@/actions/get-checkout-action";
import { handleError } from "@/lib/handleError";

import { withAuth } from "@/utils/with-user-auth";

async function getCheckoutData() {
	try {
		const checkOutResponse = await getCheckoutDataAction();
		if (checkOutResponse.status === false) {
			return Response.json(
				{ status: false, message: checkOutResponse.message },
				{ status: 400 }
			);
		}

		return Response.json(checkOutResponse);
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAuth(getCheckoutData);
