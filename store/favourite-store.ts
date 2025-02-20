import { create } from "zustand";

interface FavouriteState {
	favourites: string[];
	addFavourite: (id: string) => void;
	removeFavourite: (id: string) => void;
	isFavourite: (id: string) => boolean;
	toggleFavourite: (id: string) => void;
	updateFavourites: (ids: string[]) => void;
}

const useFavouriteStore = create<FavouriteState>((set, get) => ({
	favourites: [],
	addFavourite: (id: string) => set((state) => ({ favourites: [...state.favourites, id] })),
	removeFavourite: (id: string) =>
		set((state) => ({ favourites: state.favourites.filter((f) => f !== id) })),
	isFavourite: (id: string) => get().favourites.includes(id),
	toggleFavourite: (id: string) =>
		get().isFavourite(id) ? get().removeFavourite(id) : get().addFavourite(id),
	updateFavourites: (ids: string[]) => set({ favourites: ids }),
}));

export default useFavouriteStore;
