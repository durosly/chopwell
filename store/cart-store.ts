import { create } from "zustand";

interface CartState {
	cart: string[];
	cartModal: boolean;
	orderCode: string;
	setOrderCode: (code: string) => void;
	openCartModal: () => void;
	closeCartModal: () => void;
	addToCart: (id: string) => void;
	removeFromCart: (id: string) => void;
	isInCart: (id: string) => boolean;
	toggleCart: (id: string) => void;
	updateCart: (ids: string[]) => void;
}

const useCartStore = create<CartState>((set, get) => ({
	cart: [],
	cartModal: false,
	orderCode: "123ed",
	setOrderCode: (code: string) => set({ orderCode: code }),
	openCartModal: () => set({ cartModal: true }),
	closeCartModal: () => set({ cartModal: false, orderCode: "" }),
	addToCart: (id: string) => set((state) => ({ cart: [...state.cart, id] })),
	removeFromCart: (id: string) =>
		set((state) => ({ cart: state.cart.filter((f) => f !== id) })),
	isInCart: (id: string) => get().cart.includes(id),
	toggleCart: (id: string) =>
		get().isInCart(id) ? get().removeFromCart(id) : get().addToCart(id),
	updateCart: (ids: string[]) => set({ cart: ids }),
}));

export default useCartStore;
