import { useEffect, useState } from "react";
import useThrottle from "../HOOKS(React)/UseThrottle";

const ResizeEvent = () => {
  const [value, setValue] = useState(null as any);
  const throttledValue = useThrottle(value, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log(throttledValue);  // delayed value
  }, [throttledValue]);

  function handleResize(e: any) {
    setValue(e);
  }
  return (
    <div>
      ResizeEvent
    </div>
  );
};

export default ResizeEvent;
