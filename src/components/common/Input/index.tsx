import type { InputProps } from "../../../types/input";
import styles from "./index.module.css";

const Input = ({ value, placeholder, onChange }: InputProps) => {
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
