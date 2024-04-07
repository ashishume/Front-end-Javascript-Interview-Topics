import { useRef, useEffect } from "react";

const areEqual = (prevDeps: any, nextDeps: any) => {
  if (prevDeps === null) return false;
  if (prevDeps.length !== nextDeps.length) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) {
      return false;
    }
  }

  return true;
};

const useCustomMemo = (callback: any, deps: any) => {
  // variable or state -> cached Value
  const memoizedRef = useRef(null as any);

  // Changes in deps
  if (!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)) {
    memoizedRef.current = {
      value: callback(),
      deps,
    };
  }

  // cleanup logic
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  // return the memoised value (if any)
  return memoizedRef.current.value;
};

export default useCustomMemo;
