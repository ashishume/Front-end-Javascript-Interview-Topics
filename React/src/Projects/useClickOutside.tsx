import { useEffect, useRef } from "react";

export function useClickOutside(callback: () => void) {
  const ref = useRef<any>();

  const handleClick = (e:any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
}
