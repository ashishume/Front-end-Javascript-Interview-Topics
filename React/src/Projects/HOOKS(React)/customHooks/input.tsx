import useInput from "./inputChangeHook";

const Input = () => {
  const [value, bind, reset] = useInput("");

  return (
    <>
      {value}
      <input {...(bind as any)} type="text" />
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default Input;
