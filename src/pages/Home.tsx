import { useEffect, useState } from "react";

import ProductGrid from "../components/product/ProductGrid";

import { getProducts } from "../services/productApi";

import type { Product } from "../types";
import Header from "../components/header";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();

      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Header />
      <ProductGrid products={products} />
    </>
  );
};

export default Home;
