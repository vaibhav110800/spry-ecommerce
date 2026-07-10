import type { StateCreator } from "zustand";
import { toast } from "react-toastify";

import type { FavoritesSlice, ProductStore } from "../../types";

export const createFavoritesSlice: StateCreator<
  ProductStore,
  [],
  [],
  FavoritesSlice
> = (set, get) => ({
  favoriteProductIds: [],

  toggleFavorite: (product) =>
    set((state) => {
      const isFavorite = state.favoriteProductIds.includes(product.id);

      const favoriteProductIds = isFavorite
        ? state.favoriteProductIds.filter((id) => id !== product.id)
        : [...state.favoriteProductIds, product.id];

      if (isFavorite) {
        toast.info("Removed from favorites");
      } else {
        toast.success("Added to favorites ❤️");
      }

      return { favoriteProductIds };
    }),

  isFavorite: (productId) => get().favoriteProductIds.includes(productId),
});
