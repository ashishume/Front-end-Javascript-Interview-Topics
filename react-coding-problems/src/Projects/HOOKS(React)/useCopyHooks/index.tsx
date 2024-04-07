import React, { useState } from "react";

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
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <button onClick={() => useCopy(value)}>Copy text</button>
    </div>
  );
};

export default UseCopyHook;
