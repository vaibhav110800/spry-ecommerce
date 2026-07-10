import styles from "./index.module.css";
import { type RefObject } from "react";
import ProductCard from "../ProductCard";
import type { Product } from "../../../types";

interface ProductGridProps {
  products: Product[];
  sentinelRef?: RefObject<HTMLDivElement | null>;
  hasMore?: boolean;
}

const ProductGrid = ({ products, sentinelRef, hasMore }: ProductGridProps) => {
  return (
    <>
      <section className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {hasMore && (
        <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
      )}
    </>
  );
};

export default ProductGrid;
