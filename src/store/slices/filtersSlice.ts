import type { StateCreator } from "zustand";

import type { FiltersSlice, ProductStore } from "../../types";

export const createFiltersSlice: StateCreator<
  ProductStore,
  [],
  [],
  FiltersSlice
> = (set) => ({
  search: "",
  category: "All",
  rating: 0,
  sort: "asc",
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setRating: (rating) => set({ rating }),
  setSort: (sort) => set({ sort }),
  // currentPage: 1,
  // setSearch: (search) => set({ search, currentPage: 1 }),
  // setCategory: (category) => set({ category, currentPage: 1 }),
  // setRating: (rating) => set({ rating, currentPage: 1 }),
  // setSort: (sort) => set({ sort, currentPage: 1 }),
  // setCurrentPage: (page) => set({ currentPage: page }),
});
