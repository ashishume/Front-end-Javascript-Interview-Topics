import { useEffect, useRef, useState } from "react";

const useWhyDidYouUpdateCustomHook = (name: any, props: any) => {
  const prevProps = useRef();

  let updatedState = {};
  useEffect(() => {
    if (prevProps.current) {
      const keys = Object.keys({ ...(prevProps.current as any), ...props });
      keys.forEach((key) => {
        if (typeof (prevProps as any).current[key] === "object" && props[key]) {
          if (
            JSON.stringify((prevProps as any).current[key]) !==
            JSON.stringify(props[key])
          ) {
            updatedState = {
              from: (prevProps as any).current[key],
              to: props[key],
            };
          }
        } else {
          if ((prevProps as any).current[key] !== props[key]) {
            updatedState = {
              from: (prevProps as any).current[key],
              to: props[key],
            };
          }
        }
      });

      if (Object.keys(updatedState)) {
        console.log("this has updated", updatedState);
      }
    }
    prevProps.current = props;
  }, [name, props]);
};

export const WhyDidYouUpdateCustomHook = () => {
  const [count, setCounter] = useState(0);

  return (
    <>
      <button onClick={() => setCounter(count + 1)}>Click here</button>
      <Example count={count} />
    </>
  );
};

const Example = (props: any) => {
  useWhyDidYouUpdateCustomHook("Example", props);
  return <>{props.count}</>;
};

export default WhyDidYouUpdateCustomHook;
