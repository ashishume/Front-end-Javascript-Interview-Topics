import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const UseCopyHook = () => {
  const [value, setValue] = useState("");

  async function useCopy(text: any) {
    if (!navigator.clipboard) {
      console.warn("Clipboard not enabled");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error("Error occured");
    }
  }

  return (
    <div>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></Textarea>
      <Button onClick={() => useCopy(value)}>Copy text</Button>
    </div>
  );
};

export default UseCopyHook;
