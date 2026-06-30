import styles from "./index.module.css";

import { formatCurrency } from "../../../utils/formatCurrency";
import type { Product } from "../../../types";

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { useProductStore } from "../../../store/productStore";

const ProductCard = ({ product }: { product: Product }) => {
  const { favoriteProducts, toggleFavorite } = useProductStore();

  const isFavorite = favoriteProducts.some(
    (favoriteProduct) => favoriteProduct.id === product.id,
  );

  return (
    <article
      className={`${styles.card} ${isFavorite ? styles.favoriteCard : ""}`}
    >
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

      <button
        className={styles.favoriteButton}
        onClick={() => toggleFavorite(product)}
      >
        {isFavorite ? <FaHeart className={styles.favorite} /> : <FiHeart />}
      </button>
    </article>
  );
};

export default ProductCard;
