import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";

const InputField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: any) => void;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Textarea
      placeholder="Type anything..."
      value={value}
      ref={inputRef}
      onChange={onChange}
    />
  );
};

export default InputField;
