import { useMemo } from "react";

import Header from "../components/Header";
import EmptyState from "../components/common/EmptyState";
import ProductGrid from "../components/product/ProductGrid";

import { useProductStore } from "../store/productStore";

import { filterProducts } from "../utils/filterProducts";
import { sortProducts } from "../utils/sortProducts";

const Favorites = () => {
  const {
    favoriteProducts,

    search,
    category,
    rating,
    sort,
  } = useProductStore();

  const visibleProducts = useMemo(() => {
    const filtered = filterProducts({
      products: favoriteProducts,
      search,
      category,
      rating,
    });

    return sortProducts({
      products: filtered,
      sort,
    });
  }, [favoriteProducts, search, category, rating, sort]);

  return (
    <>
      <Header />

      {visibleProducts.length ? (
        <ProductGrid products={visibleProducts} />
      ) : (
        <EmptyState
          title="No favorite products found ❤️"
          description="Try changing your search or filters."
        />
      )}
    </>
  );
};

export default Favorites;
