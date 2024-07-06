import { useEffect, useRef, useState } from "react";
import { IPayload, IPosition } from "./model";
import { createRectangle } from "./Shapes/rectangle";
import { v4 as uuid } from "uuid";
import { ShapeColors, Shapes } from "./constants";

const CanvasDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [initialPos, setInitialPos] = useState<IPosition>({
    x: 0,
    y: 0,
  });
  const [client, setClient] = useState<IPosition>({
    x: 0,
    y: 0,
  });
  const [isMouseDown, setMouseDown] = useState(false);
  const [data, setData] = useState<IPayload[]>([]);
  const [payload, setPayload] = useState<IPayload | null>(null);
  const [currentShape, setCurrentShape] = useState(Shapes.rectangle);
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      // Set the actual drawing dimensions of the canvas to match the window dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const width = client.x - initialPos.x;
        const height = client.y - initialPos.y;
        data.map(
          ({ x, y, height, width, id, shape, fillStyle, strokeStyle }) => {
            if (shape === Shapes.rectangle) {
              createRectangle(
                context,
                { x, y },
                { x: 0, y: 0 },
                width,
                height,
                fillStyle,
                strokeStyle,
                2,
                true
              );
            }
          }
        );

        switch (currentShape) {
          case Shapes.rectangle: {
            const rectNodeData = createRectangle(
              context,
              client,
              initialPos,
              width,
              height,
              ShapeColors.lightBlue,
              ShapeColors.blue,
              2,
              false
            );
            const payloadData: IPayload = {
              x: initialPos.x,
              y: initialPos.y,
              height,
              width,
              ...rectNodeData,
              id: uuid(),
            };
            setPayload(payloadData);
          }
        }
      }
    }
  }, [client.x, client.y]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setMouseDown(true);
    setInitialPos({
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setMouseDown(false);
    if (payload) {
      setData((prev) => [...prev, payload]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isMouseDown) {
      setClient({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          height: "100vh",
          width: "100vw",
        }}
      ></canvas>
    </div>
  );
};

export default CanvasDrawing;
