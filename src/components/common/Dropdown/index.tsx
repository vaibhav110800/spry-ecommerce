import type { DropdownProps } from "../../../types";
import styles from "./index.module.css";

const Dropdown = <T extends string | number>({
  options,
  value,
  placeholder,
  onChange,
}: DropdownProps<T>) => {
  return (
    <select
      className={styles.dropdown}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {placeholder && <option value="">{placeholder}</option>}

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
