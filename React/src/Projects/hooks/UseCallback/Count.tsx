import React from "react";

const Count = ({ count, text }: any) => {
  console.log(text);
  return <>{count}</>;
};

export default React.memo(Count);
