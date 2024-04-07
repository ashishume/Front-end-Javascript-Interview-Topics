import React, { useEffect, useRef, useState } from "react";

const DidComponentUpdate = () => {
  const ref = useRef(false);

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (ref.current) {
      //do not call for the first time
      console.log("updating");
    } else {
      ref.current = true; // once loaded call for other updates
    }
  }, [counter]);

  return (
    <>
      {counter}

      <button onClick={() => setCounter((prev) => prev + 1)}>Add</button>
    </>
  );
};

export default DidComponentUpdate;
