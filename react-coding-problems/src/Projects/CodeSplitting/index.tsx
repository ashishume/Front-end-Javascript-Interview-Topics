import { Button } from "@/components/ui/button";
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
      <Button
        style={{
          background: "lightgray",
          padding: "3px",
          borderRadius: "4px",
        }}
        onClick={() => setIsActive(!isActive)}
      >
        Set active button
      </Button>

      {isActive && (
        <Suspense fallback={<>Loading...</>}>
          <LazyComp />
        </Suspense>
      )}
    </div>
  );
};

export default LazyParentComp;
