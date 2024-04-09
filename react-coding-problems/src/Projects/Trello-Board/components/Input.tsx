import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";

const InputField = ({
  value,
  onChange,
  placeholder = "Type anything...",
  isPointerEventsDisabled,
}: {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  isPointerEventsDisabled: boolean;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Textarea
      style={{
        pointerEvents: isPointerEventsDisabled ? "none" : "auto",
        marginTop: "5px",
      }}
      placeholder={placeholder}
      value={value}
      ref={inputRef}
      onChange={onChange}
    />
  );
};

export default InputField;
