import { useProductStore } from "../../../store/productStore";
import type { Product } from "../../../types";
import styles from "./index.module.css";
import { formatCurrency } from "../../../utils/formatCurrency";

const ProductBanner = ({
  products,
  paginatedProducts,
  filteredProducts,
}: {
  products: Product[];
  paginatedProducts: Product[];
  filteredProducts: Product[];
}) => {
  const category = useProductStore((state) => state.category);
  const categories = useProductStore((state) => state.categories);

  const totalCategories = category === "All" ? categories.length - 1 : 1;
  const bestDeal = products.reduce(
    (lowest, product) => (product.price < lowest.price ? product : lowest),
    products[0] ?? { price: 0 },
  );

  const heroProducts = products.slice(0, 3);

  return (
    <div>
      <section className={styles.hero} aria-labelledby="storefront-title">
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Curated daily picks</span>

          <h2 id="storefront-title">Shop fresher finds, faster.</h2>

          <p>
            Explore beauty, fragrance, furniture and everyday essentials with
            quick filters, ratings and wishlist picks in one clean storefront.
          </p>

          <div className={styles.heroStats} aria-label="Store highlights">
            <span>{products.length} products</span>
            <span>{totalCategories} categories</span>
            <span>Best from {formatCurrency(bestDeal.price)}</span>
          </div>
        </div>

        <div className={styles.heroShowcase} aria-hidden>
          {heroProducts.map((product, index) => (
            <div className={styles.showcaseItem} key={product.id}>
              <img src={product.image} alt="" />
              <span>{index === 0 ? "Trending" : product.category}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.resultsHeader}>
        <div>
          <span className={styles.kicker}>Featured Products</span>
          <h2>{filteredProducts.length} results for your store</h2>
        </div>

        <p>
          Showing {paginatedProducts.length} of {filteredProducts.length}
        </p>
      </section>
    </div>
  );
};

export default ProductBanner;
