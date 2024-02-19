import React, { useState } from "react";
import Progress from "./progress";
const ProgressBar = () => {
  const [currentProgressIndex, setCurrentProgressIndex] = useState(0);

  const [progress, setProgress] = useState([
    {
      key: generateId() || 0,
      value: 0,
    },
  ]);

  /** generates unique id */
  function generateId() {
    // Combine timestamp and random number
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
  }

  /** adds new progress bars when user clicks */
  function addProgress() {
    if (progress?.length < 5) {
      setProgress((prev) => [...prev, { key: generateId(), value: 0 }]);
    }
  }

  /** update the current active progress index */
  function handleOnComplete(index: number) {
    if (index === currentProgressIndex) {
      setCurrentProgressIndex((prevIndex) => prevIndex + 1);
    }
  }

  
  return (
    <div>
      <button onClick={addProgress}>Add Progress</button>
      {progress &&
        progress.map(({ key, value }, index) => {
          return (
            <Progress
              percent={value}
              id={key}
              key={key}
              onComplete={() => handleOnComplete(index)}
              setProgress={setProgress}
              isTriggered={index === currentProgressIndex}
            />
          );
        })}
    </div>
  );
};

export default ProgressBar;
