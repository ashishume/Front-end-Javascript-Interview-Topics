import React from "react";

const ButtonHandler = ({ buttonMethod, name }: any) => {
  console.log(name, "==> button handler");
  return (
    <>
      <button onClick={buttonMethod}>{name}</button>
    </>
  );
};

export default React.memo(ButtonHandler);
