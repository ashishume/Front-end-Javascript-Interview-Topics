import { useEffect, useRef, useState } from 'react';

export const useThrottler = <T,>(value: T, delay: number) => {
  const [throttle, setThrottle] = useState(value);
  const lastExecuted = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let now = Date.now();
    let remaining = delay - (now - lastExecuted.current);
    if (remaining <= 0) {
      lastExecuted.current = now;
      setThrottle(value);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottle(value);
      }, remaining);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);
  return throttle;
};
