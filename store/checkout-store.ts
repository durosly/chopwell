import { create } from "zustand";

type DeliveryMethod = "delivery" | "pickup" | "";
type PaymentMethod = "card" | "wallet" | "virtual-account" | "pay-for-me" | "";

type CartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	total: number;
};
export type Cart = {
	title: string;
	total: number;
	percentage: number;
	schedule: string;
	note: string;
	items: CartItem[];
};

type CheckoutData = {
	subtotal: number;
	deliveryFee: number;
	discount: number;
	total: number;
	cart: Cart[];
	address: string;
	deliveryMethod: DeliveryMethod;
	paymentMethod: PaymentMethod;
};

type CheckoutDataState = CheckoutData & {
	setPaymentMethod: (method: PaymentMethod) => void;
	setDeliveryMethod: (method: DeliveryMethod) => void;
};

const useCheckoutStore = create<CheckoutDataState>((set) => ({
	subtotal: 100,
	deliveryFee: 10,
	discount: 5,
	total: 105,
	cart: [
		{
			title: "Groceries",
			total: 50,
			percentage: 50,
			schedule: "2023-10-01",
			note: "Weekly groceries",
			items: [
				{ id: "1", name: "Apple", price: 2, quantity: 10, total: 20 },
				{ id: "2", name: "Bread", price: 3, quantity: 5, total: 15 },
				{ id: "3", name: "Milk", price: 5, quantity: 3, total: 15 },
			],
		},
		{
			title: "Electronics",
			total: 50,
			percentage: 50,
			schedule: "2023-10-02",
			note: "Office supplies",
			items: [
				{ id: "4", name: "Mouse", price: 25, quantity: 1, total: 25 },
				{ id: "5", name: "Keyboard", price: 25, quantity: 1, total: 25 },
			],
		},
	],
	address: "",
	deliveryMethod: "",
	paymentMethod: "",

	setPaymentMethod: (method: PaymentMethod) => set({ paymentMethod: method }),
	setDeliveryMethod: (method: DeliveryMethod) => set({ deliveryMethod: method }),
}));

export default useCheckoutStore;
