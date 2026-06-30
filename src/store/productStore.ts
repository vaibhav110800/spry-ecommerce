import { create } from "zustand";

import { getProducts } from "../services/productApi";

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

  favoriteIds: number[];

  theme: ThemeType;

  loading: boolean;
  error: string;

  /* Actions */
  fetchProducts: () => Promise<void>;

  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setRating: (rating: number) => void;
  setSort: (sort: SortType) => void;

  toggleFavorite: (id: number) => void;
  toggleTheme: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  categories: [],

  search: "",
  category: "All",
  rating: 0,
  sort: "asc",

  favoriteIds: [],

  theme: "light",

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

  toggleFavorite: (id) =>
    set((state) => {
      const favoriteIds = state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
        : [...state.favoriteIds, id];
      const exists = state.favoriteIds.includes(id);

      if (exists) {
        toast.info("Removed from favorites");
      } else {
        toast.success("Added to favorites ❤️");
      }

      return {
        favoriteIds,
      };
    }),

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
