import React, { useEffect, useState } from "react";

const debounceMethod = (value: any, delay: number) => {
  const [data, setData] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return data;
};

export default debounceMethod;
