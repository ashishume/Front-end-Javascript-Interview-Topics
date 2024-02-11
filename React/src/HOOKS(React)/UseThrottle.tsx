import React, { useEffect, useState } from "react";

const UseThrottle = (callback: any, delay: number) => {
  const [isThrottled, setIsThrottled] = useState(false);
  useEffect(() => {
    let timer: any;
    if (!isThrottled) {
      // Execute the callback immediately if not throttled
      callback();
      setIsThrottled(true);

      timer = setTimeout(() => {
        setIsThrottled(true);
      }, delay);
    }

    return () => {
      clearTimeout(timer);
      setIsThrottled(false);
    };
  }, [callback, delay, isThrottled]);

  return isThrottled;
};
export default UseThrottle;