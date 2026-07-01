import type { DropdownOption, SortType } from "../types";

export const NETWORK_DELAY = 500;
export const PRODUCTS_PER_PAGE = 8;
export const FAVORITES_KEY = "favorite-products";
export const THEME_KEY = "theme";

export const ratingOptions: DropdownOption<number>[] = [
  { label: "All Ratings", value: 0 },
  { label: "4★", value: 4 },
  { label: "3★", value: 3 },
  { label: "2★", value: 2 },
  { label: "1★", value: 1 },
];

export const sortOptions: DropdownOption<SortType>[] = [
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];
