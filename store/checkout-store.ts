import { CartResponse } from "@/types";
import { create } from "zustand";

type DeliveryMethod = "delivery" | "pickup" | "";
// type PaymentMethod = "card" | "wallet" | "virtual-account" | "pay-for-me" | "";
// type CardPaymentOption = "existing" | "new" | "";

type CartItem = {
	_id: string;
	name: string;
	price: number;
	quantity: number;
	total: number;
};
export type Cart = {
	_id: string;
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
	// card: {
	// 	options: CardPaymentOption;
	// 	existing: string;
	// 	new: {
	// 		cardNumber: string;
	// 		expiryDate: string;
	// 		cvc: string;
	// 		saveForFuture: boolean;
	// 	};
	// };
	total: number;
	cart: Cart[];
	address: string;
	deliveryMethod: DeliveryMethod;
	// paymentMethod: PaymentMethod;
};

type AddressData = {
	address: string;
	deliveryFee: number;
};

type CheckoutDataState = CheckoutData & {
	// setCardOption: (option: CardPaymentOption) => void;
	// setCardExisting: (cardId: string) => void;
	// setNewCardNumber: (number: string) => void;
	// setNewCardExpiryDate: (date: string) => void;
	// setNewCardCVV: (cvv: string) => void;
	// setNewCardSaveForFuture: (save: boolean) => void;

	// setPaymentMethod: (method: PaymentMethod) => void;
	setDeliveryMethod: (method: DeliveryMethod) => void;

	setAddress: (addressData: AddressData) => void;

	initCheckout: (checkoutData: CartResponse) => void;
	setNote: (note: string, cartId: string) => void;
	setSchedule: (note: string, cartId: string) => void;
};

const useCheckoutStore = create<CheckoutDataState>((set) => ({
	subtotal: 100,
	deliveryFee: 10,
	discount: 5,
	total: 105,
	// card: {
	// 	options: "existing",
	// 	existing: "",
	// 	new: {
	// 		cardNumber: "",
	// 		expiryDate: "",
	// 		cvc: "",
	// 		saveForFuture: false,
	// 	},
	// },
	cart: [],
	address: "",
	deliveryMethod: "",
	// paymentMethod: "",

	// cart group
	setNote: (note: string, cartId: string) =>
		set((state) => {
			const newCart = state.cart.map((cart) => {
				if (cart._id === cartId) {
					return {
						...cart,
						note,
					};
				}

				return cart;
			});

			return { cart: newCart };
		}),
	setSchedule: (schedule: string, cartId: string) =>
		set((state) => {
			const newCart = state.cart.map((cart) => {
				if (cart._id === cartId) {
					return {
						...cart,
						schedule,
					};
				}

				return cart;
			});

			return { cart: newCart };
		}),

	// card methods
	// setCardOption: (option: CardPaymentOption) =>
	// 	set((state) => ({ card: { ...state.card, options: option } })),
	// setCardExisting: (cardId: string) =>
	// 	set((state) => ({ card: { ...state.card, existing: cardId } })),
	// setNewCardNumber: (number: string) =>
	// 	set((state) => ({
	// 		card: {
	// 			...state.card,
	// 			new: {
	// 				...state.card.new,
	// 				cardNumber: number,
	// 			},
	// 		},
	// 	})),
	// setNewCardExpiryDate: (date: string) =>
	// 	set((state) => ({
	// 		card: { ...state.card, new: { ...state.card.new, expiryDate: date } },
	// 	})),
	// setNewCardCVV: (cvc: string) =>
	// 	set((state) => ({ card: { ...state.card, new: { ...state.card.new, cvc } } })),
	// setNewCardSaveForFuture: (save: boolean) =>
	// 	set((state) => ({
	// 		card: { ...state.card, new: { ...state.card.new, saveForFuture: save } },
	// 	})),

	// setPaymentMethod: (method: PaymentMethod) => set({ paymentMethod: method }),
	setDeliveryMethod: (method: DeliveryMethod) => set({ deliveryMethod: method }),

	setAddress: (data: AddressData) =>
		set((state) => ({
			address: data.address,
			deliveryFee: data.deliveryFee,
			total: state.subtotal + data.deliveryFee - state.discount,
		})),

	initCheckout: (checkoutData: CartResponse) =>
		set({
			subtotal: checkoutData.subtotal,
			discount: checkoutData.discount,
			total: checkoutData.total,
			deliveryFee: checkoutData.delivery,
			cart: checkoutData.data.map((cartGroup) => ({
				_id: cartGroup._id,
				title: cartGroup.title,
				percentage: cartGroup.percentage,
				total: cartGroup.total,
				schedule: "",
				note: "",
				items: cartGroup.items.map((item) => ({
					_id: item._id,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					total: item.quantity * item.price,
				})),
			})),
		}),
}));

export default useCheckoutStore;
