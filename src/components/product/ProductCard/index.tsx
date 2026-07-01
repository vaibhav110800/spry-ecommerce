import styles from "./index.module.css";

import { formatCurrency } from "../../../utils/formatCurrency";
import type { Product } from "../../../types";

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { useProductStore } from "../../../store/productStore";

const ProductCard = ({ product }: { product: Product }) => {
  const isFavorite = useProductStore((state) =>
    state.favoriteProducts.some(
      (favoriteProduct) => favoriteProduct.id === product.id,
    ),
  );
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);

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

          <span aria-label={`Rated ${product.rating} out of 5`}>
            <span aria-hidden>⭐</span> {product.rating}
          </span>
        </div>
      </div>

      <button
        className={styles.favoriteButton}
        type="button"
        aria-label={`${isFavorite ? "Remove" : "Add"} ${product.name} ${
          isFavorite ? "from" : "to"
        } favorites`}
        aria-pressed={isFavorite}
        onClick={() => toggleFavorite(product)}
      >
        {isFavorite ? (
          <FaHeart className={styles.favorite} aria-hidden />
        ) : (
          <FiHeart aria-hidden />
        )}
      </button>
    </article>
  );
};

export default ProductCard;
