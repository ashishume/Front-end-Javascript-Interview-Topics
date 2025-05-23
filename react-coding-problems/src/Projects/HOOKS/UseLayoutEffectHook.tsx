import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 *
 * useLayoutEffect is a hook in React that allows you to perform side effects that need to be done synchronously after the DOM has been updated but before the browser has painted the screen.
 */
const UseLayoutEffectHook = () => {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = (ref.current as any).getBoundingClientRect();
    setTooltipHeight(height);
    console.log("Leffect");
  }, []);
  useEffect(() => {
    console.log("effect");
  }, []);
  return (
    <>
      {console.log(tooltipHeight)}
      <div className="container" ref={ref}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni odit
        rerum iusto ad, dolore ratione, omnis voluptates facilis, explicabo
        deleniti minus laboriosam. Nesciunt exercitationem dicta repudiandae
        deleniti a, non distinctio.
      </div>
    </>
  );
};

export default UseLayoutEffectHook;
