import type { StateCreator } from "zustand";

import { getProducts } from "../../services/productApi";
import type { ProductsSlice, ProductStore } from "../../types";

export const createProductsSlice: StateCreator<
  ProductStore,
  [],
  [],
  ProductsSlice
> = (set, get) => ({
  products: [],
  categories: [],
  loading: false,
  error: "",

  fetchProducts: async () => {
    const { loading, products } = get();

    if (loading || products.length > 0) {
      return;
    }

    try {
      set({ loading: true, error: "" });

      const products = await getProducts();

      const categories = [
        "All",
        ...new Set(products.map((product) => product.category)),
      ];

      set({ products, categories, loading: false });
    } catch {
      set({ loading: false, error: "Failed to load products." });
    }
  },
});
