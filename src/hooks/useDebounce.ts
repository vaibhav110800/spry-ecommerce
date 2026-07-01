import { useEffect, useState } from "react";

/**
 * Returns a debounced version of the provided value.
 * The returned value is updated only after the specified delay
 * has passed without the value changing, helping reduce
 * unnecessary re-renders or expensive operations (e.g. API calls).
 */
const useDebounce = <T>(value: T, delay = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
