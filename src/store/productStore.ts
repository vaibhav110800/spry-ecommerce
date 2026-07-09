import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createProductsSlice } from "./slices/productsSlice";
import { createFiltersSlice } from "./slices/filtersSlice";
import { createFavoritesSlice } from "./slices/favoritesSlice";
import { createThemeSlice } from "./slices/themeSlice";

import type { ProductStore } from "../types";

/**
 * Global store for managing product data, filters, favorites,
 * pagination, theme, and related actions — composed from slices.
 */
export const useProductStore = create<ProductStore>()(
  persist(
    (...a) => ({
      ...createProductsSlice(...a),
      ...createFiltersSlice(...a),
      ...createFavoritesSlice(...a),
      ...createThemeSlice(...a),
    }),
    {
      name: "product-store",
      partialize: (state) => ({
        favoriteProductIds: state.favoriteProductIds,
        theme: state.theme,
      }),
    },
  ),
);
