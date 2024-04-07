import { useEffect, useState } from "react";

const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeId);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
