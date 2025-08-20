import { useEffect, useState, useRef } from "react";

const ProgressBar = ({ onComplete }: any) => {
  const [progress, setProgress] = useState(0);
  const intervalRef: any = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          onComplete();
          return 100;
        }
        return prev + 2; // speed of progress
      });
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [onComplete]);

  return (
    <div
      style={{
        margin: "10px 0",
        width: "100%",
        background: "#eee",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          height: "20px",
          width: `${progress}%`,
          background: "black",
          borderRadius: "8px",
          transition: "width 0.2s ease",
        }}
      />
    </div>
  );
};

export default function ProgressQueue() {
  const [queue, setQueue] = useState([] as any); // track progress bars
  const [activeIndex, setActiveIndex] = useState(0);
  const MAX_PROGRESS_BARS = 5;

  const addProgressBar = () => {
    if (queue.length < MAX_PROGRESS_BARS) {
      setQueue((prev: any) => [...prev, {}]);
    }
  };

  const handleComplete = () => {
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <div style={{ width: "400px", margin: "40px auto", textAlign: "center" }}>
      <h2>Queued Progress Bars</h2>
      <button
        onClick={addProgressBar}
        disabled={
          queue.length >= MAX_PROGRESS_BARS || activeIndex < queue.length
        }
        style={{
          padding: "8px 16px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add Progress Bar
      </button>

      <div>
        {queue.map((_: any, index: any) => (
          <div key={index}>
            {index === activeIndex ? (
              <ProgressBar onComplete={handleComplete} />
            ) : (
              <div
                style={{
                  margin: "10px 0",
                  width: "100%",
                  height: "20px",
                  background: index < activeIndex ? "black" : "#eee",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <p>
        {queue.length}/{MAX_PROGRESS_BARS} progress bars
      </p>
    </div>
  );
}
