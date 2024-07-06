import React, { useEffect, useRef, useState } from "react";
import { IPayload, IPosition } from "./model";
import { Shapes } from "./constants";
import Crop32Icon from "@mui/icons-material/Crop32";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { renderShapes } from "./RenderShapes";
import { createNewShapes } from "./CreateShape";
import TitleIcon from "@mui/icons-material/Title";
const CanvasDrawing = () => {
  const toolbarShapes = [
    Shapes.circle,
    Shapes.rectangle,
    Shapes.cursor,
    Shapes.title,
  ];
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

      //clear last item
      setPayload(null);
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
      case Shapes.title: {
        return <TitleIcon />;
      }
    }
  };

  const isPointInRectangle = (x: number, y: number, element: IPayload) => {
    return (
      x >= element.x &&
      x <= element.x + element.width &&
      y >= element.y &&
      y <= element.y + element.height
    );
  };

  const isPointInCircle = (x: number, y: number, element: IPayload) => {
    const centerX = element.x + element.width / 2;
    const centerY = element.y + element.height / 2;
    const radiusX = element.width / 2;
    const radiusY = element.height / 2;
    const normalizedX = (x - centerX) / radiusX;
    const normalizedY = (y - centerY) / radiusY;
    return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
  };

  // const isPointInText = (x: number, y: number, text: any) => {
  //   // Approximate text bounding box
  //   const textWidth = text.text.length * 10; // Approximate width per character
  //   const textHeight = 16; // Approximate height of the text

  //   return (
  //     x >= text.x &&
  //     x <= text.x + textWidth &&
  //     y >= text.y - textHeight &&
  //     y <= text.y
  //   );
  // };

  const findElementAtPosition = (x: number, y: number, data: IPayload[]) => {
    for (let el of data) {
      switch (el.shape) {
        case Shapes.rectangle: {
          if (isPointInRectangle(x, y, el)) {
            return el;
          }
          break;
        }
        case Shapes.circle: {
          if (isPointInCircle(x, y, el)) {
            return el;
          }
          break;
        }
        case Shapes.title: {
          // if (isPointInText(x, y, el)) {
          //   return el;
          // }
          break;
        }
        default: {
          break;
        }
      }
    }

    return null;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && currentShape === Shapes.cursor) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const foundElement = findElementAtPosition(x, y, data);
      if (foundElement) {
        const newData = data.map((value) => {
          if (value.id === foundElement.id) {
            value.strokeStyle = "red";
            value.fillStyle = "orange";
            return value;
          }
          return value;
        });
        setData(newData);
        if (context) {
          renderShapes(newData, context);
        }
      }
    }
  };
  return (
    <div>
      <div className="relative">
        <div
          className="absolute top-0 left-[40%] w-96 
        text-center shadow-md rounded-md"
        >
          {toolbarShapes.map((shape, index) => {
            return (
              <div
                key={index}
                className={`${
                  shape === currentShape ? "bg-slate-300" : null
                } inline-block m-1 p-1 w-[70px] rounded-md hover:bg-slate-100`}
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
        onClick={handleClick}
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
