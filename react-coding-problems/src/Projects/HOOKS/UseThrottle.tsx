import { useEffect, useRef, useState } from "react";

const useThrottle = (value: any, interval: number = 500): any => {
  const [throttledValue, setThrottledValue] = useState<any>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    /** check if current date has passed the given (interval + lastexecuted date) only then set the value */
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timerId);
    }
  }, [value, interval]);

  return throttledValue;
};
export default useThrottle;
