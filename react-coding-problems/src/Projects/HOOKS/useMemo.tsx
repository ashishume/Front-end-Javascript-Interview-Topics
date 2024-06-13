import { useMemo, useState } from "react";

const Factorial = () => {
  const findFactorial = (value: number): number => {
    return value <= 0 ? 1 : value * findFactorial(value - 1);
  };
  const [value, setValue] = useState(1);
  const [inc, setInc] = useState(0);
  const factorialResult = useMemo(() => findFactorial(value), [value]);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const incVal = () => setInc((i) => i + 1);
  
  console.log(inc);

  return (
    <div>
      <input type="number" min="0" value={value} onChange={onChange} />
      <h1>{factorialResult}</h1>
      <button onClick={incVal}>Submit</button>
    </div>
  );
};

export default Factorial;
