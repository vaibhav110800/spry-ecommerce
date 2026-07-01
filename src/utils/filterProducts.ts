import type { FilterProductsParams, Product } from "../types";

/**
 * Filters products based on search text, selected category,
 * and minimum rating.
 */
export const filterProducts = ({
  products,
  search,
  category,
  rating,
}: FilterProductsParams): Product[] => {
  return products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    const matchesRating = product.rating >= rating;

    return matchesSearch && matchesCategory && matchesRating;
  });
};
