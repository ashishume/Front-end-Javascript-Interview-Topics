import React, { useMemo, useState } from "react";

// export const AddCounter=()=>{

//     return
// }

const UseMemo2 = () => {
  const [inc, setInc] = useState(0);
  const [incTwice, setIncTwice] = useState(0);
  const Increment1 = () => {
    setInc(inc + 1);

    console.log("inc1", inc);
  };
  const Increment2 = () => {
    setIncTwice(incTwice + 2);
    console.log("inc2", incTwice);
  };

  const isEven = useMemo(() => {
    let i = 0;
    while (i < 1000000000) i++;
    return inc % 2 === 0;
  }, [inc]);
  return (
    <>
      <h1>Increment 1: {inc}</h1>
      <h1>Increment 2: {incTwice}</h1>
      <button onClick={Increment1}>Increment +1</button>
      <button onClick={Increment2}>Increment +2</button>
      {isEven ? "Even" : "Odd"}
    </>
  );
};

export default UseMemo2;

/**
 * The React docs say that
 *  useCallback: Returns a memoized callback.
 *  And that useMemo: Returns a memoized value.
 */