import { useState } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  const bind = {
    value,
    onChange: (e: any) => {
      setValue(e.target.value);
    },
  };

  return [value, bind, reset];
};

export default useInput;
