import type { Product, SortProductsParams } from "../types";

export const sortProducts = ({
  products,
  sort,
}: SortProductsParams): Product[] => {
  return [...products].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price,
  );
};
