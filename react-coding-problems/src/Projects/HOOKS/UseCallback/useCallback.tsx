import { useCallback, useState } from "react";
import ButtonHandler from "./buttonHandler";
import Count from "./Count";
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

export default UseCallbackHook;
