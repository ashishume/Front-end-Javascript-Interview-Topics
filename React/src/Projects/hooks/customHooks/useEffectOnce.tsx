import React, { useEffect } from "react";

const useEffectOnce = (effect: any) => {
  useEffect(() => {
    effect();
  }, []);
  return null;
};

export default useEffectOnce;
