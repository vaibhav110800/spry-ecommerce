import LoaderImg from "../../../asset/Loader.gif";
import styles from "./index.module.css";

const Loader = () => {
  return (
    <div className={styles.root}>
      <img
        src={LoaderImg}
        alt="loading"
        loading="lazy"
        className={styles.loaderImg}
      />
      <p>Loading....</p>
    </div>
  );
};

export default Loader;
