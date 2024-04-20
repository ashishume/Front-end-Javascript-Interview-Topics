import { Button } from "@/components/ui/button";
import style from "../style.module.scss";
import { useEffect, useRef } from "react";
const CommentActionField = ({
  value,
  onChange,
  onSubmitHandler,
  onCancelHandler,
}: any) => {
  const inputRef = useRef(null as any);
  useEffect(() => {
    inputRef.current.focus();

    return () => {
      inputRef.current = null;
    };
  }, []);

  return (
    <div className={style["input-field-container"]}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        className={style["input-field"]}
        placeholder="comment here..."
      />
      <Button size="sm" onClick={onSubmitHandler} disabled={!value}>
        Submit
      </Button>
      <Button size="sm" variant="outline" onClick={onCancelHandler}>
        Cancel
      </Button>
    </div>
  );
};

export default CommentActionField;
