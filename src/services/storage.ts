import type { Product, ThemeType } from "../types";

const FAVORITES_KEY = "favorite-products";
const THEME_KEY = "theme";

export const getFavoriteProducts = (): Product[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);

  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavoriteProducts = (products: Product[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(products));
};

export const getTheme = (): ThemeType => {
  return (localStorage.getItem(THEME_KEY) as ThemeType) ?? "light";
};

export const saveTheme = (theme: ThemeType) => {
  localStorage.setItem(THEME_KEY, theme);
};
