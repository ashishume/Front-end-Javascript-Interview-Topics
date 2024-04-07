import React, { memo } from "react";

const Child = ({ count }: { count: number }) => {
  console.log("updating counter child!!");

  return <div>{count}</div>;
};

export default memo(Child);
