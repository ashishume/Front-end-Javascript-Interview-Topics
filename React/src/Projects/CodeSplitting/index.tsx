import { Suspense, lazy, useState } from "react";

function isDelayCheck(callback: any) {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000);
      }).then(() => callback);
}
const LazyComp = lazy(() => isDelayCheck(import("./lazyComp")));
const LazyParentComp = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <button
        style={{
          background: "lightgray",
          padding: "3px",
          borderRadius: "4px",
        }}
        onClick={() => setIsActive(!isActive)}
      >
        Set active button
      </button>

      {isActive && (
        <Suspense fallback={<>Loading...</>}>
          <LazyComp />
        </Suspense>
      )}
    </div>
  );
};

export default LazyParentComp;
