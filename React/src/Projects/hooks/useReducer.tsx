import React, { useEffect, useReducer, useRef } from "react";

const initialState = {
  isRunning: false,
  time: 0,
};

const StopWatch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);

  useEffect(() => {
    if (!state.isRunning) {
      return;
    }
    idRef.current = setInterval(() => dispatch({ type: "tick" }), 1000) as any;

    return () => {
      clearInterval(idRef.current);
      idRef.current = 0;
    };
  }, [state.isRunning]);

  return (
    <>
      <div>
        <h1>{state.time}</h1>
        <button onClick={() => dispatch({ type: "start" })}>Start</button>
        <button onClick={() => dispatch({ type: "stop" })}>Stop</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </>
  );
};

function reducer(
  state: {
    isRunning: boolean;
    time: number;
  },
  action: any
) {
  switch (action.type) {
    case "start":
      return { ...state, isRunning: true };
    case "stop":
      return { ...state, isRunning: false };
    case "tick":
      return { ...state, time: state.time + 1 };
    case "reset":
      return { time: 0, isRunning: false };
    default:
      throw new Error();
  }
}

export default StopWatch;
