import React, { useEffect, useRef } from "react";
import { Button, FormControl } from "react-bootstrap";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const childRef = useRef();

  function handleBtnClick() {
    /** these 2 methods are being accessed from child component where forward ref is defined */
    (childRef.current as any).focusChild();
    console.log((childRef.current as any).getValue());
  }

  return (
    <div
      style={{
        margin: "10px",
      }}
    >
      <Button onClick={handleBtnClick}>Click </Button>
      <ChildComponent ref={childRef} />
    </div>
  );
};

export default ParentComponent;
