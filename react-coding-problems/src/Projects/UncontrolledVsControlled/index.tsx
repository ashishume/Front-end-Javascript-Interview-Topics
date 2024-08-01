import { useRef, useState } from "react";

const ControlledComp = () => {
  const [input, setInput] = useState("");
  let handleSubmit = () => {
    alert(`Input value: ${input}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const UnControlledComp = () => {
  let inputValue = useRef<any>(null);
  let handleSubmit = (e: any) => {
    alert(`Input value: ${inputValue.current.value}`);
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputValue} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ControlledComp;
