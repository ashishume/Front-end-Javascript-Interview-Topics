import { useEffect, useState } from "react";

const useDebouce = (value: any, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouce;
