import { ShapeColors, Shapes } from "./constants";
import { IPayload, IPosition } from "./model";
import { createCircle } from "./Shapes/circle";
import { createRectangle } from "./Shapes/rectangle";
import { v4 as uuid } from "uuid";

export const createNewShapes = (
  client: IPosition,
  currentShape: string,
  initialPos: IPosition,
  context: CanvasRenderingContext2D,
  setPayload: any
) => {
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
    case Shapes.title: {
      // context.font = "16px Arial";
      // context.fillStyle = ShapeColors.black;
      // context.fillText("Ashish", initialPos.x, initialPos.y);
      break;
    }
    default: {
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
