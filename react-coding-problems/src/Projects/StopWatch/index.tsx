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

  function formatTime(time:number){
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  }


  return (
    <>
      <h1>
        {/* format time is optional if we need to convert it into minute, hour, seconds */}
        {formatTime(timer)}</h1>

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
