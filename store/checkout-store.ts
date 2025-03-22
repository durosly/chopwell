import { create } from "zustand";

type DeliveryMethod = "delivery" | "pickup" | "";
type PaymentMethod = "card" | "wallet" | "virtual-account" | "pay-for-me" | "";
type CardPaymentOption = "existing" | "new" | "";

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
	card: {
		options: CardPaymentOption;
		existing: string;
		new: {
			cardNumber: string;
			expiryDate: string;
			cvc: string;
			saveForFuture: boolean;
		};
	};
	total: number;
	cart: Cart[];
	address: string;
	deliveryMethod: DeliveryMethod;
	paymentMethod: PaymentMethod;
};

type CheckoutDataState = CheckoutData & {
	setCardOption: (option: CardPaymentOption) => void;
	setCardExisting: (cardId: string) => void;
	setNewCardNumber: (number: string) => void;
	setNewCardExpiryDate: (date: string) => void;
	setNewCardCVV: (cvv: string) => void;
	setNewCardSaveForFuture: (save: boolean) => void;

	setPaymentMethod: (method: PaymentMethod) => void;
	setDeliveryMethod: (method: DeliveryMethod) => void;
};

const useCheckoutStore = create<CheckoutDataState>((set) => ({
	subtotal: 100,
	deliveryFee: 10,
	discount: 5,
	total: 105,
	card: {
		options: "existing",
		existing: "",
		new: {
			cardNumber: "",
			expiryDate: "",
			cvc: "",
			saveForFuture: false,
		},
	},
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

	// card methods
	setCardOption: (option: CardPaymentOption) => set((state) => ({ card: { ...state.card, options: option } })),
	setCardExisting: (cardId: string) => set((state) => ({ card: { ...state.card, existing: cardId } })),
	setNewCardNumber: (number: string) =>
		set((state) => ({
			card: {
				...state.card,
				new: {
					...state.card.new,
					cardNumber: number,
				},
			},
		})),
	setNewCardExpiryDate: (date: string) => set((state) => ({ card: { ...state.card, new: { ...state.card.new, expiryDate: date } } })),
	setNewCardCVV: (cvv: string) => set((state) => ({ card: { ...state.card, new: { ...state.card.new, cvv } } })),
	setNewCardSaveForFuture: (save: boolean) => set((state) => ({ card: { ...state.card, new: { ...state.card.new, saveForFuture: save } } })),

	setPaymentMethod: (method: PaymentMethod) => set({ paymentMethod: method }),
	setDeliveryMethod: (method: DeliveryMethod) => set({ deliveryMethod: method }),
}));

export default useCheckoutStore;
