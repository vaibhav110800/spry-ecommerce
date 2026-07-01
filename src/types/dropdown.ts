export interface DropdownOption<T extends string | number = string> {
  label: string;
  value: T;
}

export interface DropdownProps<T extends string | number = string> {
  options: DropdownOption<T>[];
  value: T;
  label: string;
  placeholder?: string;
  onChange: (value: T) => void;
}
