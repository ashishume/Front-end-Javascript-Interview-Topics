import { useEffect, useRef } from "react";

const CanvasDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const rectWidth = 200;
        const rectHeight = 100;
        const rectX = (canvas.width - rectWidth) / 2;
        const rectY = (canvas.height - rectHeight) / 2;

        context.fillStyle = "lightblue"; // Fill color
        context.fillRect(rectX, rectY, rectWidth, rectHeight);

        context.strokeStyle = "blue"; // Border color
        context.lineWidth = 5; // Border width
        context.strokeRect(rectX, rectY, rectWidth, rectHeight);
      }
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          height: "100vh",
          width: "100vw",
        }}
      ></canvas>
    </div>
  );
};

export default CanvasDrawing;
