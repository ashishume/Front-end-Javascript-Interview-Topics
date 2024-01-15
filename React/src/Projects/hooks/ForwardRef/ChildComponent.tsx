import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { FormControl } from "react-bootstrap";

/** forward ref is defined as we need to pass the ref of input field to parent  */
const ChildComponent = forwardRef((props, ref) => {
  const childRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusChild: () => {
      (childRef.current as any).focus();
    },
    getValue: () => {
      return (childRef.current as any).value;
    },
  }));

  return (
    <FormControl ref={childRef} placeholder="Start typing..."></FormControl>
  );
});

export default ChildComponent;
