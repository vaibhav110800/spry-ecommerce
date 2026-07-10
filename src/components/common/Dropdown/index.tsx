import type { DropdownProps } from "../../../types";
import styles from "./index.module.css";

const Dropdown = <T extends string | number>({
  options,
  value,
  label,
  placeholder,
  onChange,
  disabled,
}: DropdownProps<T>) => {
  return (
    <select
      className={styles.dropdown}
      value={value}
      aria-label={label}
      onChange={(e) => onChange(e.target.value as T)}
      disabled={disabled}
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
