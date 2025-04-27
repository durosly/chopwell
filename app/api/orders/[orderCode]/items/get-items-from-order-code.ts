import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import OrderModel from "@/models/order";

type CartItem = {
	_id: string;
	_productId: {
		_id: string;
		name: string;
		image: string;
		isAvailable: boolean;
	};
	price: number;
	label: string;
	quantity: number;
};

async function getItemsFromOrderCode(
	_: Request,
	{ params }: { params: Promise<{ orderCode: string }> }
) {
	try {
		const { orderCode } = await params;

		await connectMongo();
		const order = await OrderModel.findOne({ code: orderCode }).populate(
			"products._productId"
		);
		if (!order) {
			return Response.json({ message: "Order not found" }, { status: 404 });
		}
		const items = order.products;
		const cartItems = items.map((item: CartItem) => ({
			id: item._id,
			productId: item._productId._id,
			name: item._productId.name,
			price: item.price,
			quantity: item.quantity,
			label: item.label,
			image: item._productId.image,
			isAvailable: item._productId.isAvailable,
		}));

		// Create a map to track unique labels and their new cart labels
		const labelMap = new Map<string, string>();
		let cartCounter = 1;

		// Replace original labels with sequential cart labels
		const anonymizedCartItems = cartItems.map((item: CartItem) => {
			if (!labelMap.has(item.label)) {
				labelMap.set(item.label, `cart${cartCounter}`);
				cartCounter++;
			}
			return {
				...item,
				label: labelMap.get(item.label),
			};
		});

		// group cart items by label
		const groupedCartItems = Object.groupBy(
			anonymizedCartItems,
			(item: CartItem) => item.label
		);

		console.log(groupedCartItems);

		return Response.json({ items: groupedCartItems });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default getItemsFromOrderCode;
