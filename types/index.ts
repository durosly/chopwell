export type UserType = "admin" | "employee" | "customer";

export type FormattedAddress = {
	_id: string;
	landmark: string;
	location: string;
	region: string;
	deliveryPrice: number;
	title: string;
};

// Represents an individual item in the cart
export interface CartItem {
	_id: string;
	quantity: number;
	price: number;
	discountedPrice: number;
	name: string;
	available: boolean;
	image: string;
	preparation_time: number;
	promo: string | null;
	category: string;
}

// Represents a cart containing multiple items
export interface Cart {
	_id: string;
	title: string;
	items: CartItem[];
	total: number;
	percentage: number;
}

// Represents the main cart response structure
export interface CartResponse {
	total: number;
	subtotal: number;
	discount: number;
	delivery: number;
	data: Cart[];
}

// export type CardDetails = {
// 	options: "existing" | "new";
// 	existing?: string;
// 	new?: {
// 		cardNumber: string;
// 		expiryDate: string;
// 		cvc: string;
// 		saveForFuture: boolean;
// 	};
// };

// export type PaymentDetails = {
// 	method: "card" | "virtual-account" | "wallet" | "pay-for-me";
// 	card: CardDetails;
// };

export type ShippingDetails = {
	method: "delivery" | "pickup";
	address?: FormattedAddress;
};

export type OrderData = {
	// paymentDetails: PaymentDetails;
	shipping: ShippingDetails;
};

export type Notification = {
	_id: string;
	_userId: string;
	title: string;
	description: string;
	link: string;
	linkDescription: string;
	isRead: boolean;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
};
