import { useState, useEffect, useRef } from "react";

const useHasFocus = () => {
  const [hasFocus, setHasFocus] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleFocus = () => setHasFocus(true);
    const handleBlur = () => setHasFocus(false);

    const node = ref.current;
    if (node) {
      (node as HTMLElement).addEventListener("focus", handleFocus);
      (node as HTMLElement).addEventListener("blur", handleBlur);

      return () => {
        (node as HTMLElement).removeEventListener("focus", handleFocus);
        (node as HTMLElement).removeEventListener("blur", handleBlur);
      };
    }
  }, [ref]);

  return [ref, hasFocus];
};

export default useHasFocus;
