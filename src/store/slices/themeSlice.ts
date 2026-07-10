import type { StateCreator } from "zustand";

import type { ThemeSlice, ProductStore } from "../../types";

export const createThemeSlice: StateCreator<
  ProductStore,
  [],
  [],
  ThemeSlice
> = (set) => ({
  theme: "light",

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
});
