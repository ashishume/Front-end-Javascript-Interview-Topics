import { useEffect, useRef, useState } from "react";
import { IPayload, IPosition } from "./model";
import { createRectangle } from "./Shapes/rectangle";
import { v4 as uuid } from "uuid";
import { ShapeColors, Shapes } from "./constants";
import { createCircle } from "./Shapes/circle";
import Crop32Icon from "@mui/icons-material/Crop32";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { renderShapes } from "./RenderShapes";
const CanvasDrawing = () => {
  const toolbarShapes = [Shapes.circle, Shapes.rectangle, Shapes.cursor];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [initialPos, setInitialPos] = useState<IPosition>({ x: 0, y: 0 });
  const [client, setClient] = useState<IPosition>({ x: 0, y: 0 });
  const [isMouseDown, setMouseDown] = useState(false);
  const [data, setData] = useState<IPayload[]>([]);
  const [payload, setPayload] = useState<IPayload | null>(null);
  const [currentShape, setCurrentShape] = useState(Shapes.cursor);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set the actual drawing dimensions of the canvas to match the window dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, [canvasRef]);

  useEffect(() => {
    (async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const context: CanvasRenderingContext2D | null =
          canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          renderShapes(data, context);
          createNewShapes(context);
        }
      }
    })();
  }, [client.x, client.y]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (currentShape !== Shapes.cursor) {
      setMouseDown(true);
      setInitialPos({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseUp = () => {
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

  const createNewShapes = (context: CanvasRenderingContext2D) => {
    const width = client.x - initialPos.x;
    const height = client.y - initialPos.y;
    let node = null;
    switch (currentShape) {
      case Shapes.rectangle: {
        node = createRectangle(
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
        break;
      }
      case Shapes.circle: {
        const centerX = initialPos.x + width / 2;
        const centerY = initialPos.y + height / 2;
        node = createCircle(
          context,
          centerX,
          centerY,
          Math.abs(width / 2),
          Math.abs(height / 2),
          ShapeColors.lightBlue,
          ShapeColors.blue,
          2
        );
        break;
      }
    }

    const payloadData: IPayload = {
      x: initialPos.x,
      y: initialPos.y,
      height,
      width,
      ...(node as { shape: string; fillStyle: string; strokeStyle: string }),
      id: uuid(),
    };
    setPayload(payloadData);
  };

  const insertIcons = (shape: string) => {
    switch (shape) {
      case Shapes.circle: {
        return <RadioButtonUncheckedIcon />;
      }
      case Shapes.rectangle: {
        return <Crop32Icon />;
      }
      case Shapes.cursor: {
        return <TouchAppIcon />;
      }
    }
  };

  return (
    <div>
      <div className="relative">
        <div
          className="absolute top-0 left-[40%] w-72 
        text-center shadow-md rounded-md"
        >
          {toolbarShapes.map((shape, index) => {
            return (
              <div
                key={index}
                className={`${
                  shape === currentShape ? "bg-slate-300" : null
                } inline-block m-1 p-1 rounded-md hover:bg-slate-100`}
                onClick={() => setCurrentShape(shape)}
              >
                <div className="cursor-pointer">
                  {insertIcons(shape)}
                  <div className="text-xs">{shape}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
