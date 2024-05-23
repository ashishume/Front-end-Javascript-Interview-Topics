import "./index.scss";
import { useState, useEffect } from "react";
// const CONCURRENCY_LIMIT = 3;

export default function ProgressBarWithQueue() {
  const [bars, setBars] = useState(0);
  const [numFilledUpBars, setNumFilledUpBars] = useState(0);

  return (
    <div>
      <button onClick={() => setBars((prev) => prev + 1)}>Add</button>
      {new Array(bars).fill(null).map((_, index) => {
        return (
          <ProgressBars
            key={index}
            /** is any index is greater then already filled bars then dont start the progress bar,
             * meaning, the previous bars has not finished yet
             */
            isEmpty={index > numFilledUpBars}
            // isEmpty={index >= numFilledUpBars + CONCURRENCY_LIMIT} // to put a limit of 3, when all 3 gets completed then start the fourth progress bar
            onCompleted={() => setNumFilledUpBars((prev) => prev + 1)}
          />
        );
      })}
    </div>
  );
}

export function ProgressBars({
  isEmpty,
  onCompleted,
}: {
  isEmpty: boolean;
  onCompleted: () => void;
}) {
  const [start, setStart] = useState(false);
  useEffect(() => {
    /** is its not empty or already started then just return it, dont fill the progress bar */
    if (isEmpty || start) {
      return;
    }
    setStart(true);
  }, [isEmpty]);

  return (
    <div className="container">
      <div
        className={`progress ${start ? "filled" : null}`}
        //when transition finishes from css this callback gets triggerd
        onTransitionEnd={onCompleted}
      ></div>
    </div>
  );
}
