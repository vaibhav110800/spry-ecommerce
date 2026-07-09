import { type ReactNode } from "react";
import styles from "./index.module.css";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Wrapper;
