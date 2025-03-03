"use server";
import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import CartModel from "@/models/cart";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import "server-only";

async function getCartDataAction() {
	await connectMongo();

	let sessionId = "";
	const session = await auth();
	const userId = session?.user.id;

	if (!userId) {
		sessionId = await getAnonymousSessionId();
	}

	const filter = userId ? { userId } : { sessionId };

	const cart = await CartModel.findOne(filter);

	if (!cart) {
		return { message: "Cart not found", status: false };
	}

	const now = new Date();

	const cartData = {
		subtotal: 0,
		data: [],
	};

	const subtotal = await cart.group.reduce(
		async (accPromise: Promise<number>, group: { items: any[]; title: string }) => {
			const acc = await accPromise;

			cartData.data.push({
				_id: group._id,
				title: group.title,
				total: 0,
				percentage: 0,
				items: [],
			});

			const total = await group.items.reduce(
				async (
					accPromise: Promise<number>,
					item: { foodId: string; quantity: number }
				) => {
					const acc = await accPromise;
					const food = await FoodModel.findById(item.foodId).populate(
						"_categoryIds"
					);
					if (!food) return acc;
					const price = food.price;
					const promo = await PromoModel.findOne({
						items: { $elemMatch: { foodId: food._id } },
						startDate: { $lte: now },
						endDate: { $gte: now },
					});

					// console.log("promo", promo);

					// if promo apply discount else 0

					const discount = promo?.precentageDiscount || 0;
					const discountedPrice = price - (price * discount) / 100;

					cartData.data[cartData.data.length - 1].items.push({
						_id: food._id,
						quantity: item.quantity,
						price: discountedPrice,
						name: food.name,
						available: food.available,
						image: food.image,
						preparation_time: food.preparation_time,
						promo: promo,
					});

					return acc + discountedPrice * item.quantity;
				},
				Promise.resolve(0)
			);

			cartData.data[cartData.data.length - 1].total = total;

			return acc + total;
		},
		Promise.resolve(0)
	);

	cartData.subtotal = subtotal;

	// calculate percentage of each group
	cartData.data.forEach((group) => {
		group.percentage = (group.total / subtotal) * 100;
	});

	return { status: true, data: cartData };
}

export default getCartDataAction;
