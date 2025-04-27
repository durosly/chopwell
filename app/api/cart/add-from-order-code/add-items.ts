import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import { handleError } from "@/lib/handleError";
import { z } from "zod";
import CartModel from "@/models/cart";
import CartItemGroupModel from "@/models/cart-item-group";
import CartItemModel from "@/models/cart-item";

// Cart item schema
const cartItemSchema = z.object({
	id: z.string(),
	productId: z.string(),
	name: z.string(),
	price: z.string(),
	quantity: z.number().int(),
	label: z.string(),
	image: z.string().url(),
});

// Full data schema
const dataSchema = z
	.object({})
	.catchall(
		z
			.array(cartItemSchema)
			.min(1, { message: "Each cart array must have at least one item." })
	)
	.refine((obj) => Object.keys(obj).length > 0, {
		message: "Data object must have at least one property.",
	})
	.refine((obj) => obj.hasOwnProperty("cart1"), {
		message: "Data object must have 'cart1' property.",
	})
	.refine((obj) => Object.keys(obj).every((key) => /^cart\d+$/.test(key)), {
		message: "All property names must match the pattern 'cart' followed by digits (e.g., 'cart1', 'cart2').",
	});

async function addItemsToCart(request: Request) {
	try {
		const data = await request.json();

		// console.log(data);

		if (Object.keys(data).length === 0) {
			return Response.json({ message: "No items to add" }, { status: 400 });
		}

		// use zod to validate the data
		const {
			success,
			error: zodError,
			data: validatedData,
		} = dataSchema.safeParse(data);

		if (!success) {
			const message = handleError(zodError);
			return Response.json({ message }, { status: 400 });
		}

		// load all items into array

		// console.log(validatedData);

		await connectMongo();

		let sessionId = "";
		const session = await auth();
		const userId = session?.user.id;

		if (!userId) {
			sessionId = await getAnonymousSessionId({ get: false });
		}

		if (!sessionId && !userId) {
			return Response.json(
				{ message: "Error creating session. Please, log in to continue" },
				{ status: 500 }
			);
		}

		const filter = userId ? { userId } : { sessionId };

		let cart = await CartModel.findOne(filter);

		if (!cart) {
			cart = await CartModel.create(filter);
		}

		for (const group of Object.keys(validatedData)) {
			const newCartGroup = await CartItemGroupModel.create({
				title: group,
				cartId: cart._id,
			});

			for (const item of validatedData[group]) {
				await CartItemModel.create({
					foodId: item.productId,
					groupId: newCartGroup._id,
					quantity: item.quantity,
					cartId: cart._id,
				});
			}
		}

		return Response.json({ message: "Items added to cart" }, { status: 200 });
	} catch (error) {
		const message = handleError(error);
		console.log(message);
		return Response.json({ message }, { status: 500 });
	}
}

export default addItemsToCart;
