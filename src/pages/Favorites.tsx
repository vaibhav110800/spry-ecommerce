import { useMemo } from "react";

import Header from "../components/header";
import EmptyState from "../components/common/EmptyState";
import ProductGrid from "../components/product/ProductGrid";
import Pagination from "../components/common/Pagination";

import { useProductStore } from "../store/productStore";

import { filterProducts } from "../utils/filterProducts";
import { sortProducts } from "../utils/sortProducts";
import { PRODUCTS_PER_PAGE } from "../utils/constant";
import Wrapper from "../components/common/Wrapper";
import { useFavoriteProducts } from "../hooks/useFavoriteProducts";
import { Helmet } from "react-helmet-async";

const Favorites = () => {
  const favoriteProducts = useFavoriteProducts();
  const search = useProductStore((state) => state.search);
  const category = useProductStore((state) => state.category);
  const rating = useProductStore((state) => state.rating);
  const sort = useProductStore((state) => state.sort);
  const currentPage = useProductStore((state) => state.currentPage);
  const setCurrentPage = useProductStore((state) => state.setCurrentPage);

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
          <ProductGrid products={paginatedProducts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
