import { ChangeEvent, useState } from "react";
import "./dialog.scss";
import InputField from "./InputField";
import { Button } from "@/components/ui/button";

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
        <Button className="button" onClick={position.toggle}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default Dialog;
