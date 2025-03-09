"use server";
import "server-only";
import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import CartModel from "@/models/cart";
import FoodModel from "@/models/food";
import PromoModel from "@/models/promo";
import getAnonymousSessionId from "@/utils/get-anonymous-session-id";
import CartItemGroupModel from "@/models/cart-item-group";
import CartItemModel from "@/models/cart-item";

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

	const cartGroup = await CartItemGroupModel.find({ cartId: cart._id }).sort({
		createdAt: -1,
	});

	if (cartGroup.length === 0) {
		return { message: "Cart is empty", status: false };
	}

	for (const group of cartGroup) {
		const groupData = {
			_id: group._id,
			title: group.title,
			items: [],
			total: 0,
			percentage: 0,
		};

		const cartItems = await CartItemModel.find({ groupId: group._id }).sort({
			createdAt: -1,
		});

		for (const item of cartItems) {
			const food = await FoodModel.findById(item.foodId).populate("_categoryIds");
			if (!food) continue;

			const price = food.price;
			const promo = await PromoModel.findOne({
				items: { $elemMatch: { foodId: food._id } },
				startDate: { $lte: now },
				endDate: { $gte: now },
			});

			const discount = promo?.precentageDiscount || 0;
			const discountedPrice = price - (price * discount) / 100;

			// @ts-expect-error: not specified types
			groupData.items.push({
				_id: item._id,
				quantity: item.quantity,
				price: discountedPrice,
				actualPrice: price,
				name: food.name,
				available: food.available,
				image: food.image,
				preparation_time: food.preparation_time,
				promo: promo,
				category: food._categoryIds
					// @ts-expect-error: not specified types
					.map((category) => category.name)
					.join(", "),
			});

			groupData.total += discountedPrice * item.quantity;
		}

		// @ts-expect-error: not specified types
		cartData.data.push(groupData);
		cartData.subtotal += groupData.total;
	}

	// calculate percentage of each group
	cartData.data.forEach((group) => {
		// @ts-expect-error: not specified types
		group.percentage = (group.total / cartData.subtotal) * 100;
	});

	return { status: true, data: cartData };
}

export default getCartDataAction;
