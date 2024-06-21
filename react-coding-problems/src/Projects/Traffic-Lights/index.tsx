import { useEffect, useRef, useState } from "react";
import "./style.scss";
export interface Config {
  [key: string]: { duration: number; nextColor: string };
}

const TrafficLights = () => {
  const config: Config = {
    green: {
      duration: 3000,
      nextColor: "yellow",
    },
    yellow: {
      duration: 500,
      nextColor: "red",
    },
    red: {
      duration: 4000,
      nextColor: "green",
    },
  };

  const [currentColor, setCurrentColor] = useState<string>("green");
  let ref = useRef(null as any);
  useEffect(() => {
    const { duration, nextColor } = config[currentColor];
    ref.current = setTimeout(() => {
      setCurrentColor(nextColor);
    }, duration);

    return () => {
      clearTimeout(ref.current);
    };
  }, [currentColor]);
  return (
    <div className="traffic-light-container">
      <div className="content">
        {Object.keys(config).map((light) => {
          return (
            <div
              key={light}
              className={`lights ${
                currentColor === light ? currentColor : "default"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default TrafficLights;
