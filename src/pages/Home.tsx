import { useEffect, useMemo } from "react";

import ProductGrid from "../components/product/ProductGrid";

import { useProductStore } from "../store/productStore";

import { filterProducts } from "../utils/filterProducts";
import { sortProducts } from "../utils/sortProducts";
import Header from "../components/Header";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";
import { PRODUCTS_PER_PAGE } from "../utils/constant";

const Home = () => {
  const {
    products,
    loading,
    error,
    search,
    category,
    rating,
    sort,
    currentPage,
    setCurrentPage,
    fetchProducts,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts({
      products,
      search,
      category,
      rating,
    });

    return sortProducts({
      products: filtered,
      sort,
    });
  }, [products, search, category, rating, sort]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <Header />

      {filteredProducts.length ? (
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
          title="No products found"
          description="Try changing your search, filters or refresh the page."
        />
      )}
    </>
  );
};

export default Home;
