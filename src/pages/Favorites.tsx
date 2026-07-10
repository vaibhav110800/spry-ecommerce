import { useEffect, useMemo } from "react";

import Header from "../components/header";
import EmptyState from "../components/common/EmptyState";
import ProductGrid from "../components/product/ProductGrid";
// import Pagination from "../components/common/Pagination";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useProductStore } from "../store/productStore";
import { filterProducts } from "../utils/filterProducts";
import { sortProducts } from "../utils/sortProducts";
import { PRODUCTS_PER_PAGE } from "../utils/constant";
import Wrapper from "../components/common/Wrapper";
import { useFavoriteProducts } from "../hooks/useFavoriteProducts";
import { Helmet } from "react-helmet-async";
import Loader from "../components/common/Loader";

const Favorites = () => {
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const favoriteProducts = useFavoriteProducts();
  const search = useProductStore((state) => state.search);
  const category = useProductStore((state) => state.category);
  const rating = useProductStore((state) => state.rating);
  const sort = useProductStore((state) => state.sort);
  // const currentPage = useProductStore((state) => state.currentPage);
  // const setCurrentPage = useProductStore((state) => state.setCurrentPage);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  // const totalPages = Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE);

  // const paginatedProducts = visibleProducts.slice(
  //   (currentPage - 1) * PRODUCTS_PER_PAGE,
  //   currentPage * PRODUCTS_PER_PAGE,
  // );

  const { visibleCount, sentinelRef, hasMore } = useInfiniteScroll({
    totalItems: visibleProducts.length,
    batchSize: PRODUCTS_PER_PAGE,
    resetKey: `${search}-${category}-${rating}-${sort}`,
  });

  const paginatedProducts = visibleProducts.slice(0, visibleCount);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <Helmet>
        <title>My Favorites | Spry E-commerce</title>
        <meta
          name="description"
          content="View and manage your favorite products saved on Spry E-commerce."
        />
      </Helmet>
      <Header />

      {visibleProducts.length ? (
        <Wrapper>
          <ProductGrid
            products={paginatedProducts}
            sentinelRef={sentinelRef}
            hasMore={hasMore}
          />
          {/* <ProductGrid products={paginatedProducts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          /> */}
        </Wrapper>
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
