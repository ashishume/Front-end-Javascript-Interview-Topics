import React, { useCallback, useEffect, useState } from "react";

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

const Child2 = React.memo(({ color }: { color: string }) => {
  console.log("updating color child 22!!!");

  return (
    <div
      style={{
        height: "100px",
        width: "100px",
        borderRadius: "50%",
        background: `#${color}`,
      }}
    ></div>
  );
});

const Child = React.memo(({ count }: { count: number }) => {
  console.log("updating counter child!!");

  return <div>{count}</div>;
});

export default Parent;
