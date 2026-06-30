import type { SortType } from ".";

export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  rating: number;
}

export interface FilterProductsParams {
  products: Product[];
  search: string;
  category: string;
  rating: number;
}

export interface SortProductsParams {
  products: Product[];
  sort: SortType;
}
