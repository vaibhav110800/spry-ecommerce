import { useEffect, useMemo } from "react";

import ProductGrid from "../components/product/ProductGrid";

import { useProductStore } from "../store/productStore";

import { filterProducts } from "../utils/filterProducts";
import { sortProducts } from "../utils/sortProducts";
import Header from "../components/Header";
import EmptyState from "../components/common/EmptyState";

const Home = () => {
  const {
    products,
    loading,
    error,

    search,
    category,
    rating,
    sort,

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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <Header />

      {filteredProducts.length ? (
        <ProductGrid products={filteredProducts} />
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
