import React, { useEffect, useRef } from "react";

const UseRef = () => {
  const input = useRef(null as any);
  useEffect(() => {
    input.current.focus();
  }, []);
  return <input ref={input} type="text" />;
};

export default UseRef;
