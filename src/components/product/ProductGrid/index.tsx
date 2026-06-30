import styles from "./index.module.css";

import ProductCard from "../ProductCard";

import type { Product } from "../../../types";

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <section className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductGrid;
