import { handleError } from "@/lib/handleError";
import { PopupItems } from "@/types";
import { z } from "zod";

async function addItemsToCart(request: Request) {
	try {
		const data = await request.json();
		const { items } = data as { items: PopupItems };

		if (Object.keys(items).length === 0) {
			return Response.json({ message: "No items to add" }, { status: 400 });
		}

		// use zod to validate the data
		const {
			success,
			error: zodError,
			data: validatedData,
		} = z
			.object({
				items: z.record(
					z.string(),
					z.array(
						z.object({
							id: z.string(),
							productId: z.string(),
							quantity: z.number(),
						})
					)
				),
			})
			.safeParse(data);

		if (!success) {
			const message = handleError(zodError);
			return Response.json({ message }, { status: 400 });
		}

		const { items: validatedItems } = validatedData;

		// load all items into array

		console.log(validatedItems);

		// check if any item is already in the cart

		// check if the item is available

		// add the item to the cart

		// return the cart

		return Response.json({ message: "Items added to cart" }, { status: 200 });
	} catch (error) {
		const message = handleError(error);
		console.log(message);
		return Response.json({ message }, { status: 500 });
	}
}

export default addItemsToCart;
