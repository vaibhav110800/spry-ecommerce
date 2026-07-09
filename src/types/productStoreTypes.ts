import type { Product, SortType, ThemeType } from "../types";

export interface ProductsSlice {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string;
  fetchProducts: () => Promise<void>;
}

export interface FiltersSlice {
  search: string;
  category: string;
  rating: number;
  sort: SortType;
  currentPage: number;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setRating: (rating: number) => void;
  setSort: (sort: SortType) => void;
  setCurrentPage: (page: number) => void;
}

export interface FavoritesSlice {
  favoriteProductIds: number[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
}

export interface ThemeSlice {
  theme: ThemeType;
  toggleTheme: () => void;
}

export type ProductStore = ProductsSlice &
  FiltersSlice &
  FavoritesSlice &
  ThemeSlice;
