import { useMemo } from "react";

import Header from "../components/Header";
import EmptyState from "../components/common/EmptyState";
import ProductGrid from "../components/product/ProductGrid";
import Pagination from "../components/common/Pagination";

import { useProductStore } from "../store/productStore";

import { filterProducts } from "../utils/filterProducts";
import { sortProducts } from "../utils/sortProducts";
import { PRODUCTS_PER_PAGE } from "../utils/constant";

const Favorites = () => {
  const {
    favoriteProducts,

    search,
    category,
    rating,
    sort,
    currentPage,
    setCurrentPage,
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

  const totalPages = Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = visibleProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  return (
    <>
      <Header />

      {visibleProducts.length ? (
        <>
          <ProductGrid products={paginatedProducts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyState
          title="No favorite products found ❤️"
          description="Try changing your search, filters or add products from list."
        />
      )}
    </>
  );
};

export default Favorites;
