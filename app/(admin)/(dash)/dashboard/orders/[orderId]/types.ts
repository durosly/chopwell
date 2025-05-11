import type { OrderData } from "@/models/order";

export type PopulatedOrder = Omit<OrderData, "_userId" | "products" | "delivery_address"> & {
	_id: string;
	_userId: {
		_id: string;
		firstname: string;
		lastname: string;
		email: string;
		phone: string;
	};
	products: Array<{
		_productId: {
			_id: string;
			name: string;
			image: string;
			price: number;
		};
		price: string;
		quantity: number;
		hasReview: boolean;
		label: string;
		unit: string;
	}>;
	delivery_address: {
		location: string;
		landmark: string;
		_regionId: {
			_id: string;
			title: string;
			deliveryPrice: number;
		};
	};
	createdAt: Date;
	updatedAt: Date;
};
