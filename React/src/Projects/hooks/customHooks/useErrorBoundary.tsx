import React, { useEffect, useState } from "react";

const useErrorBoundary = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const errorHandler = (err: any) => {
      console.error("error occured", err);
      setError(true);
    };

    window.addEventListener("error", (e) => errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);
  return error;
};

export default useErrorBoundary;
