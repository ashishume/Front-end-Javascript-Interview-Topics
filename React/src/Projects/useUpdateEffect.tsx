import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const ref = useRef<boolean>();

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return;
    } else {
      ref.current = false;
    }
    const clean = effect();

    return () => {
      if (typeof clean === "function") clean();
    };
  }, deps);

  return <></>;
};

export default useUpdateEffect;
