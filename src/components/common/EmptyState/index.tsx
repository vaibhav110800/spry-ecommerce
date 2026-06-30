import styles from "./index.module.css";

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default EmptyState;
