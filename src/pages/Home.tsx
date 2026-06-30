import ProductGrid from "../components/product/ProductGrid";

import Header from "../components/header";
import { useProductStore } from "../store/productStore";
import { useEffect } from "react";

const Home = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) return <h2>{error}</h2>;

  return (
    <>
      <Header />
      <ProductGrid products={products} />
    </>
  );
};

export default Home;
