import { Shapes } from "../constants";
import { IPosition } from "../model";

export const createRectangle = (
  context: CanvasRenderingContext2D,
  client: IPosition,
  initialPos: IPosition = { x: 0, y: 0 },
  width: number = 0,
  height: number = 0,
  fillStyle: string,
  strokeStyle: string,
  lineWidth: number,
  isRendering = false
) => {
  if (isRendering) {
    context.fillRect(client.x, client.y, width, height);
    context.strokeRect(client.x, client.y, width, height);
  } else {
    context.fillRect(initialPos.x, initialPos.y, width, height);
    context.strokeRect(initialPos.x, initialPos.y, width, height);
  }
  context.fillStyle = fillStyle;
  context.strokeStyle = strokeStyle;
  context.lineWidth = lineWidth;
  return {
    shape: Shapes.rectangle,
    fillStyle,
    strokeStyle,
  };
};
