import { memo } from "react";

const Child2 = ({ color }: { color: string }) => {
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
};

export default memo(Child2);
