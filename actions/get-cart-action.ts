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

interface PromoData {
	_id: string;
	title: string;
	precentageDiscount: number;
	startDate: Date;
	endDate: Date;
}

interface CartGroupData {
	_id: string;
	title: string;
	items: Array<{
		_id: string;
		quantity: number;
		price: number;
		discountedPrice: number;
		_foodId: string;
		name: string;
		available: boolean;
		slug: string;
		image: string;
		preparation_time: number;
		promo: PromoData | null;
		category: string;
		unit: string;
	}>;
	total: number;
	percentage: number;
}

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
		total: 0,
		subtotal: 0,
		discount: 0,
		delivery: 0,
		data: [] as CartGroupData[],
	};

	const cartGroup = await CartItemGroupModel.find({ cartId: cart._id }).sort({
		createdAt: 1,
	});

	if (cartGroup.length === 0) {
		return { message: "Cart is empty", status: false };
	}

	for (const group of cartGroup) {
		const groupData = {
			_id: group.id,
			title: group.title,
			items: [],
			total: 0,
			percentage: 0,
		};

		const cartItems = await CartItemModel.find({ groupId: group._id }).sort({
			createdAt: 1,
		});

		for (const item of cartItems) {
			const food = await FoodModel.findById(item.foodId).populate("_categoryId");
			if (!food) {
				await CartItemModel.findByIdAndDelete(item.id);
				continue;
			}

			const price = food.price;
			const promo = await PromoModel.findOne({
				items: { $elemMatch: { foodId: food._id } },
				startDate: { $lte: now },
				endDate: { $gte: now },
			});

			const discount = promo?.precentageDiscount || 0;
			const discountedPrice = price - (price * discount) / 100;

			cartData.discount += discount;

			// @ts-expect-error: not specified types
			groupData.items.push({
				_id: item.id,
				quantity: item.quantity,
				price,
				discountedPrice,
				_foodId: food.id,
				name: food.name,
				available: food.available,
				slug: food.slug,
				image: food.image,
				unit: food.unit,
				preparation_time: food.preparation_time,
				promo: promo,
				category:
					typeof food._categoryId === "object" &&
					"name" in food._categoryId
						? food._categoryId.name
						: "",
			});

			groupData.total += food.price * item.quantity;
		}

		cartData.data.push(groupData);
		cartData.subtotal += groupData.total;
	}

	if (cartData.data.length === 0) {
		return { message: "Cart is empty", status: false };
	} else if (cartData.data.length === 1 && cartData.data[0].items.length === 0) {
		return { message: "Cart is empty", status: false };
	}

	// calculate percentage of each group
	cartData.data.forEach((group) => {
		group.percentage = (group.total / cartData.subtotal) * 100;
	});

	cartData.total = cartData.subtotal - cartData.discount + cartData.delivery;

	return { status: true, data: cartData };
}

export default getCartDataAction;
