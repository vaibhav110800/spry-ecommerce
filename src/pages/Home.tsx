import { useProductStore } from "../store/productStore";

import Header from "../components/header";
import Loader from "../components/common/Loader";
import ProductWrapper from "../components/product/ProductWrapper";

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
      <Header />

      <ProductWrapper />
    </>
  );
};

export default Home;
