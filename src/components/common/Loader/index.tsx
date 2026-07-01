import LoaderImg from "../../../assets/Loader.gif";
import styles from "./index.module.css";

const Loader = () => {
  return (
    <div className={styles.root} role="status" aria-live="polite">
      <img src={LoaderImg} alt="" aria-hidden className={styles.loaderImg} />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
