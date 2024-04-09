import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";

const InputField = ({
  value,
  onChange,
  placeholder = "Type anything...",
}: {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
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
