import { useEffect, EffectCallback, DependencyList } from 'react';

const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  let isMounted = false;

  useEffect(() => {
    if (isMounted) {
      return effect();
    }
    isMounted = true;
  }, deps);
};

export default useUpdateEffect;
