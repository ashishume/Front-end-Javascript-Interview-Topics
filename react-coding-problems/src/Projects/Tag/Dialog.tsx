import { ChangeEvent, useState } from "react";
import "./dialog.scss";
import InputField from "./InputField";

interface Position {
  top: number;
  left: number;
  setValue?: any;
  toggle?: () => void;
}

const Dialog = (position: Position) => {
  return (
    <div
      style={{
        top: position.top + "px",
        left: position.left + "px",
      }}
      className="dialog-container"
    >
      <div className="dialog-container-body">
        <InputField
          setValue={(e: ChangeEvent<HTMLInputElement>) =>
            position.setValue(e.target.value)
          }
        />
        <button className="button" onClick={position.toggle}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Dialog;
