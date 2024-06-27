import { useState, useEffect, useRef } from 'react';

type ThrottlerHook<T> = [T, (value: T) => void];

export const useThrottler = <T,>(value: T, delay: number): ThrottlerHook<T> => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef<number>(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      if (now - lastExecuted.current >= delay) {
        setThrottledValue(value);
        lastExecuted.current = now;
      }
    }, delay - (Date.now() - lastExecuted.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [throttledValue, setThrottledValue];
};
