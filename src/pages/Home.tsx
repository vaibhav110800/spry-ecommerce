import { useProductStore } from "../store/productStore";

import Header from "../components/header";
import Loader from "../components/common/Loader";
import ProductWrapper from "../components/product/ProductWrapper";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <Helmet>
        <title>Spry E-commerce | Shop the Best Products Online</title>
        <meta
          name="description"
          content="Browse and shop a wide range of products at Spry E-commerce. Filter by category, rating, and price to find exactly what you need."
        />
      </Helmet>

      <Header />
      <ProductWrapper />
    </>
  );
};

export default Home;
