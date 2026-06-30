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

  toggleFavorite: (product: Product) => void;
  toggleTheme: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  categories: [],

  search: "",
  category: "All",
  rating: 0,
  sort: "asc",

  favoriteProducts: getFavoriteProducts(),

  theme: getTheme(),

  loading: false,
  error: "",

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

  setSearch: (search) => set({ search }),

  setCategory: (category) => set({ category }),

  setRating: (rating) => set({ rating }),

  setSort: (sort) => set({ sort }),

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

  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === "light" ? "dark" : "light";

      saveTheme(theme);

      return {
        theme,
      };
    }),
}));
