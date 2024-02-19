import React, { useEffect, useState } from "react";
import "./style.scss";

const Progress = ({
  percent = 0,
  onComplete,
  id,
  setProgress,
  isTriggered,
}: any) => {
  const [progressValue, setProgressValue] = useState(percent);
  useEffect(() => {
    /** trigger only when prevoius progress is completed, this value becomes true only when last progress
     * gets completed
     */
    if (isTriggered) {
      const interval = setInterval(() => {
        setProgressValue((prevValue: number) => {
          /** if value becomes 100 then return 100 and clear interval */
          if (prevValue >= 100) {
            clearInterval(interval);
            onComplete();
            return 100;
          } else {
            return prevValue + 25;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [onComplete, id]);

  useEffect(() => {
    // Update parent component's progress state
    setProgress((prevProgress: any) =>
      prevProgress.map((item: any) =>
        item.key === id ? { ...item, value: progressValue } : item
      )
    );
  }, [progressValue, id, setProgress]);
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progressValue}%` }}>
        {progressValue}
      </div>
    </div>
  );
};

export default Progress;
