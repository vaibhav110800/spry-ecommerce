import type { Product, SortProductsParams } from "../types";

/**
 * Returns a new array of products sorted by price
 * in ascending or descending order.
 */
export const sortProducts = ({
  products,
  sort,
}: SortProductsParams): Product[] => {
  return [...products].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price,
  );
};
