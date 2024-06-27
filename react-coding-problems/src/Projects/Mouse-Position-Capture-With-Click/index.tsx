import React, { useState } from "react";
import "./style.scss";
export const MouseCapture = () => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  const captureClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setPositions((prev) => [...prev, { x: e.clientX, y: e.clientY }]);
  };

  return (
    <div
      className="mouse-click-container container w-screen h-screen bg-slate-300"
      onClick={captureClick}
    >
      <div className="text-center py-5">
        Click anywhere on the screen to capture positions
      </div>

      {positions.map(({ x, y }) => {
        return (
          <div
            className="dots"
            style={{
              left: x,
              top: y,
            }}
          ></div>
        );
      })}
    </div>
  );
};
