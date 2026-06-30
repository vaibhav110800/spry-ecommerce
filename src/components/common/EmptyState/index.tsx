import styles from "./index.module.css";

const EmptyState = () => {
  return (
    <div className={styles.container}>
      <h2>No products found</h2>

      <p>Try changing your search or filters.</p>
    </div>
  );
};

export default EmptyState;
