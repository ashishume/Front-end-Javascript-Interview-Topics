import { ChangeEvent, forwardRef } from "react";
import style from "./dialog.module.scss";
import InputField from "../InputField";
import { Button } from "@/components/ui/button";

interface IDialog {
  top: number;
  left: number;
  setValue?: any;
  toggle?: () => void;
  value: string;
}

const Dialog = forwardRef(
  ({ top, left, setValue, toggle, value }: IDialog, ref: any) => {
    return (
      <div
        style={{
          top: top + "px",
          left: left + "px",
        }}
        className={style["dialog-container"]}
      >
        <div className={style["dialog-container-body"]}>
          <InputField
            setValue={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            value={value}
            ref={ref}
          />
          <Button className={style["button"]} onClick={toggle}>
            Done
          </Button>
        </div>
      </div>
    );
  }
);

export default Dialog;
