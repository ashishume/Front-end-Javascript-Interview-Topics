import { useCallback, useState } from "react";
import React from "react";

const UseCallbackHook = () => {
  const [age, ageHandler] = useState(10);
  const [salary, salaryHandler] = useState(1000);

  /** reduce unnecessary renders for calling the same method, we use useCallback()  */
  const ageInc = useCallback(() => {
    console.log("age increment");
    ageHandler(age + 1);
  }, [age]);


  const salaryInc = useCallback(() => {
    console.log("salary increment");
    salaryHandler(salary + 1000);
  }, [salary]);
  return (
    <>
      <Count count={age} text="Age  data" />
      <ButtonHandler buttonMethod={ageInc} name="Increment Age" />
      <br />
      <br />
      <br />
      <Count count={salary} text="Salary data" />
      <ButtonHandler buttonMethod={salaryInc} name="Increment Salary" />
    </>
  );
};


const ButtonHandler = React.memo(({ buttonMethod, name }: any) => {
  console.log(name, "==> button handler");
  return (
    <>
      <button onClick={buttonMethod}>{name}</button>
    </>
  );
});


const Count = React.memo(({ count, text }: any) => {
  console.log(text);
  return <>{count}</>;
});

export default UseCallbackHook;
