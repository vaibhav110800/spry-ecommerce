import { create } from "zustand";

import { getProducts } from "../services/productApi";
import {
  getFavoriteProducts,
  getTheme,
  saveFavoriteProducts,
  saveTheme,
} from "../services/storage";

import type { Product, SortType, ThemeType } from "../types";
import { toast } from "react-toastify";

interface ProductStore {
  /* State */
  products: Product[];
  categories: string[];
  search: string;
  category: string;
  rating: number;
  sort: SortType;
  currentPage: number;
  favoriteProducts: Product[];
  theme: ThemeType;
  loading: boolean;
  error: string;

  /* Actions */
  fetchProducts: () => Promise<void>;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setRating: (rating: number) => void;
  setSort: (sort: SortType) => void;
  setCurrentPage: (page: number) => void;
  toggleFavorite: (product: Product) => void;
  toggleTheme: () => void;
}

/**
 * Global store for managing product data, filters, favorites,
 * pagination, theme, and related actions.
 */
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  categories: [],
  search: "",
  category: "All",
  rating: 0,
  sort: "asc",
  currentPage: 1,
  favoriteProducts: getFavoriteProducts(),
  theme: getTheme(),
  loading: false,
  error: "",

  /**
   * Fetches products, derives available categories,
   * and updates the loading/error state.
   */
  fetchProducts: async () => {
    try {
      set({
        loading: true,
        error: "",
      });

      const products = await getProducts();

      const categories = [
        "All",
        ...new Set(products.map((product) => product.category)),
      ];

      set({
        products,
        categories,
        loading: false,
      });
    } catch {
      set({
        loading: false,
        error: "Failed to load products.",
      });
    }
  },

  setSearch: (search) =>
    set({
      search,
      currentPage: 1,
    }),

  setCategory: (category) =>
    set({
      category,
      currentPage: 1,
    }),

  setRating: (rating) =>
    set({
      rating,
      currentPage: 1,
    }),

  setSort: (sort) =>
    set({
      sort,
      currentPage: 1,
    }),

  setCurrentPage: (page) =>
    set({
      currentPage: page,
    }),

  /**
   * Adds or removes a product from favorites,
   * persists the updated list, and displays a toast notification.
   */
  toggleFavorite: (product) =>
    set((state) => {
      const isFavorite = state.favoriteProducts.some(
        (favoriteProduct) => favoriteProduct.id === product.id,
      );

      const favoriteProducts = isFavorite
        ? state.favoriteProducts.filter(
            (favoriteProduct) => favoriteProduct.id !== product.id,
          )
        : [...state.favoriteProducts, product];

      saveFavoriteProducts(favoriteProducts);

      if (isFavorite) {
        toast.info("Removed from favorites");
      } else {
        toast.success("Added to favorites ❤️");
      }

      return {
        favoriteProducts,
      };
    }),

  /**
   * Toggles between light and dark themes
   * and persists the selected preference.
   */
  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === "light" ? "dark" : "light";

      saveTheme(theme);

      return {
        theme,
      };
    }),
}));
