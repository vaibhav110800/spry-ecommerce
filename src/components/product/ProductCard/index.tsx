import styles from "./index.module.css";

import { formatCurrency } from "../../../utils/formatCurrency";
import type { Product } from "../../../types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={product.image}
        alt={product.name}
        loading="lazy"
      />

      <div className={styles.content}>
        <h3>{product.name}</h3>

        <p>{product.category}</p>

        <div className={styles.footer}>
          <span>{formatCurrency(product.price)}</span>

          <span>⭐ {product.rating}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
