import styles from "./index.module.css";
import { formatCurrency } from "../../../utils/formatCurrency";
import type { Product } from "../../../types";
import { FiHeart, FiShoppingBag, FiStar, FiTruck } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useProductStore } from "../../../store/productStore";
import fallbackImg from "../../../assets/fallbackImg.png";

const ProductCard = ({ product }: { product: Product }) => {
  const isFavorite = useProductStore((state) =>
    state.favoriteProductIds.includes(product.id),
  );
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);

  return (
    <article
      className={`${styles.card} ${isFavorite ? styles.favoriteCard : ""}`}
    >
      <img
        className={styles.image}
        src={product.image ?? fallbackImg}
        alt={product.name}
        loading="lazy"
      />

      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.category}>{product.category}</span>

          <span
            className={styles.rating}
            aria-label={`Rated ${product.rating} out of 5`}
          >
            <FiStar aria-hidden /> {product.rating}
          </span>
        </div>

        <h3>{product.name}</h3>

        <p className={styles.delivery}>
          <FiTruck aria-hidden /> Free delivery
        </p>

        <div className={styles.footer}>
          <span className={styles.price}>{formatCurrency(product.price)}</span>

          <button
            className={styles.cartButton}
            type="button"
            onClick={() => toast.success(`${product.name} added to cart`)}
          >
            <FiShoppingBag aria-hidden /> Add
          </button>
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
