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

  /**
   * useCallback is a React Hook that lets you cache a function definition between re-renders.
   *
   * Syntax: useCallback(fn, dependencies)
   *
   * Parameters:
   * - fn: The function value that you want to cache
   * - dependencies: An array of values that the function depends on
   *
   * Returns:
   * - The cached function that only changes when dependencies change
   *
   * Use cases:
   * 1. When passing callbacks to optimized child components that rely on reference equality
   * 2. When the callback is used as a dependency in other hooks
   * 3. To prevent unnecessary re-renders of child components
   */

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
