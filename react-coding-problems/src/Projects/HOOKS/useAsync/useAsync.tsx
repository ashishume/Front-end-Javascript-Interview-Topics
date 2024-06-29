import { useCallback, useEffect, useState } from "react";

const useAsync = (asyncFn: () => any, immediate = false) => {
  const [state, setState] = useState({
    status: "idle",
    value: null,
    error: null,
  });

  const refetch = useCallback(() => {
    setState({
      status: "pending",
      value: null,
      error: null,
    });

    return asyncFn()
      .then((response: any) => {
        setState({
          status: "success",
          value: response,
          error: null,
        });
      })
      .catch((error: any) => {
        setState({
          status: "error",
          value: null,
          error: error,
        });
      });
  }, [asyncFn]);

  useEffect(() => {
    if (immediate) {
      refetch();
    }
  }, [refetch, immediate]);

  const { status, value, error } = state;

  return { refetch, status, value, error };
};

export default useAsync;
