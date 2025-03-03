import { create } from "zustand";

interface CartState {
	cart: string[];
	addToCart: (id: string) => void;
	removeFromCart: (id: string) => void;
	isInCart: (id: string) => boolean;
	toggleCart: (id: string) => void;
	updateCart: (ids: string[]) => void;
}

const useCartStore = create<CartState>((set, get) => ({
	cart: [],
	addToCart: (id: string) => set((state) => ({ cart: [...state.cart, id] })),
	removeFromCart: (id: string) =>
		set((state) => ({ cart: state.cart.filter((f) => f !== id) })),
	isInCart: (id: string) => get().cart.includes(id),
	toggleCart: (id: string) =>
		get().isInCart(id) ? get().removeFromCart(id) : get().addToCart(id),
	updateCart: (ids: string[]) => set({ cart: ids }),
}));

export default useCartStore;
