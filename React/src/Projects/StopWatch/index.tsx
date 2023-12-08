import { useRef, useState } from "react";
import "./style.scss";
const StopWatchComp = () => {
  const [timer, setTimer] = useState(0);
  const ref = useRef<any>();
  function stopTimer() {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
      setTimer(0);
    }
  }

  function pauseTimer() {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
  }
  function playTimer() {
    if (!ref.current) {
      ref.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
  }
  function startTimer() {
    ref.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
  }

  return (
    <>
      <h1>{timer}</h1>

      <button
        className="stopwatch-btns"
        onClick={startTimer}
        disabled={timer > 0}
      >
        Start
      </button>
      <button
        className="stopwatch-btns"
        disabled={!ref.current}
        onClick={pauseTimer}
      >
        Pause
      </button>
      <button
        className="stopwatch-btns"
        disabled={!ref.current}
        onClick={playTimer}
      >
        Play
      </button>
      <button
        className="stopwatch-btns"
        disabled={!ref.current}
        onClick={stopTimer}
      >
        Stop
      </button>
    </>
  );
};

export default StopWatchComp;
