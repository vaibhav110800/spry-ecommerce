import type { Product, ThemeType } from "../types";
import { FAVORITES_KEY, THEME_KEY } from "../utils/constant";

/**
 * Retrieves the list of favorite products from localStorage.
 * Returns an empty array if no favorites are stored.
 */
export const getFavoriteProducts = (): Product[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);

  return favorites ? JSON.parse(favorites) : [];
};

/**
 * Saves the list of favorite products to localStorage.
 */
export const saveFavoriteProducts = (products: Product[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(products));
};

/**
 * Retrieves the user's preferred theme from localStorage.
 * Defaults to "light" if no theme is stored.
 */
export const getTheme = (): ThemeType => {
  return (localStorage.getItem(THEME_KEY) as ThemeType) ?? "light";
};

/**
 * Persists the user's selected theme in localStorage.
 */
export const saveTheme = (theme: ThemeType) => {
  localStorage.setItem(THEME_KEY, theme);
};
