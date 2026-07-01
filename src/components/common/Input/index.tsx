import type { InputProps } from "../../../types";
import styles from "./index.module.css";

const Input = ({ value, label, placeholder, onChange }: InputProps) => {
  return (
    <input
      className={styles.input}
      type="search"
      value={value}
      aria-label={label}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
