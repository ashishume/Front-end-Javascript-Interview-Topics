import { useEffect, useRef, useState } from "react";

export interface Config {
  [key: string]: { duration: number; nextColor: string };
}

const TrafficLights = () => {
  const config: Config = {
    "bg-green-500": {
      duration: 3000,
      nextColor: "bg-yellow-500",
    },
    "bg-yellow-500": {
      duration: 500,
      nextColor: "bg-red-500",
    },
    "bg-red-500": {
      duration: 4000,
      nextColor: "bg-green-500",
    },
  };

  const [currentColor, setCurrentColor] = useState<string>("bg-green-500");
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
    <div className="container flex justify-center items-center mt-5">
      <div className="flex flex-col justify-center gap-5 items-center w-48 py-10 rounded bg-gray-700	">
        {Object.keys(config).map((light) => {
          return (
            <div
              key={light}
              className={`${
                currentColor === light ? currentColor : "bg-gray-400"
              } w-36 h-36 rounded-full`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default TrafficLights;
