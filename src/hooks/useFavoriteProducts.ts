import { useMemo } from "react";

import { useProductStore } from "../store/productStore";

/**
 * Derives the full list of favorite Product objects by
 * filtering `products` against the persisted `favoriteProductIds`.
 */
export const useFavoriteProducts = () => {
  const products = useProductStore((state) => state.products);
  const favoriteProductIds = useProductStore(
    (state) => state.favoriteProductIds,
  );

  return useMemo(
    () => products.filter((product) => favoriteProductIds.includes(product.id)),
    [products, favoriteProductIds],
  );
};
