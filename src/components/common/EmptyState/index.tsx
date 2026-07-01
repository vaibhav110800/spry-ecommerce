import styles from "./index.module.css";
import noDataImg from "../../../asset/NoData.png";

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={noDataImg} alt="no product is present" />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default EmptyState;
