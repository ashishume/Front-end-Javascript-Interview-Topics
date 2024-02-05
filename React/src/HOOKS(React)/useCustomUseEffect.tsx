import React, { useRef } from "react";

const useCustomUseEffect = (effect: any, deps: any[]) => {
  const isFirstRender = useRef(true);
  const prevDeps = useRef([]);
  //first render
  if (isFirstRender.current) {
    isFirstRender.current = false;
    const cleanup = effect();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }

  // re-render
  const depsChanged = deps
    ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
    : true;

  if (depsChanged) {
    const cleanup = effect();
    if (cleanup && typeof cleanup === "function" && deps) {
      cleanup();
    }
  }
};

export default useCustomUseEffect;
