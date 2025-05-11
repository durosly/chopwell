import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import OrderModel from "@/models/order";
import { ObjectId } from "mongodb";

type ProductInfo = {
	_id: string;
	name: string;
	price: number;
	image: string;
	available: boolean;
	number_of_item: number;
};

type OrderProduct = {
	_id: string;
	_productId: ObjectId | ProductInfo;
	price: string;
	quantity: number;
	hasReview: boolean;
	label: string;
	unit: string;
};

async function getItemsFromOrderCode(
	_: Request,
	{ params }: { params: Promise<{ orderCode: string }> }
) {
	try {
		const { orderCode } = await params;

		await connectMongo();
		const order = await OrderModel.findOne({ code: orderCode.toLowerCase() }).populate(
			"products._productId"
		);
		if (!order) {
			return Response.json({ message: "Order not found" }, { status: 404 });
		}
		const items = order.products as OrderProduct[];
		const cartItems = items.map((item: OrderProduct) => {
			const productInfo = item._productId as ProductInfo;
			return {
				id: item._id,
				productId: productInfo._id,
				name: productInfo.name,
				price: item.price,
				quantity: item.quantity,
				label: item.label,
				image: productInfo.image,
				isAvailable: productInfo.available,
			};
		});

		// Create a map to track unique labels and their new cart labels
		const labelMap = new Map<string, string>();
		let cartCounter = 1;

		// Replace original labels with sequential cart labels
		const anonymizedCartItems = cartItems.map((item) => {
			const newLabel = `cart${cartCounter}`;
			if (!labelMap.has(item.label)) {
				labelMap.set(item.label, newLabel);
				cartCounter++;
			}
			return {
				...item,
				label: labelMap.get(item.label) || newLabel,
			};
		});

		// group cart items by label
		const groupedCartItems = Object.groupBy(anonymizedCartItems, (item) => item.label);

		console.log(groupedCartItems);

		return Response.json({ items: groupedCartItems });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default getItemsFromOrderCode;
