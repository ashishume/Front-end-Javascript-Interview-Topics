import { useEffect, useRef, useState } from "react";
import { IPayload, IPosition } from "./model";
import { Shapes } from "./constants";
import Crop32Icon from "@mui/icons-material/Crop32";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { renderShapes } from "./RenderShapes";
import { createNewShapes } from "./CreateShape";
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
          createNewShapes(
            client,
            currentShape,
            initialPos,
            context,
            setPayload
          );
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
