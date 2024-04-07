import { Button } from "@/components/ui/button";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

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

/** forward ref is defined as we need to pass the ref of input field to parent  */
export const ChildComponent = forwardRef((props, ref) => {
  const childRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusChild: () => {
      (childRef.current as any).focus();
    },
    getValue: () => {
      return (childRef.current as any).value;
    },
  }));

  return <input ref={childRef} placeholder="Start typing..." />;
});

export default ParentComponent;
