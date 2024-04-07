import React, { useCallback, useEffect, useState } from "react";
import Child from "./Child";
import Child2 from "./Child2";

const Parent = () => {
  const [count, setCounter] = useState(0);
  const [color, setColor] = useState("000");
  useEffect(() => {
    console.log("updating parent!!");
  }, []);

  const setRandomCounter = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  const setRandomColor = useCallback(() => {
    setColor(Math.floor(Math.random() * 16777215).toString(16));
  }, []);
  return (
    <div style={{ margin: "10px", fontSize: "25px" }}>
      <button onClick={() => setRandomCounter()}>Add Counter</button>
      <button onClick={() => setRandomColor()}>Set Random Color</button>
      <Child count={count} />
      <Child2 color={color} />
    </div>
  );
};

export default Parent;
