import { useEffect, useState } from "react";

const useDidMount = (initialState = false) => {
  const [isMounted, setMount] = useState(initialState);

  useEffect(() => {
    setMount(true);

    return () => {
      setMount(false);
    };
  }, []);
  return isMounted;
};

export default useDidMount;
