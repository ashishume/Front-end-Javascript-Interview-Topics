import { Shapes } from "../constants";
import { IPosition } from "../model";

export const drawPencilPath = (
  context: CanvasRenderingContext2D,
  path: IPosition[],
  fillStyle: string,
  lineWidth: number,
  isRendering: boolean = false
) => {
  context.beginPath();
  context.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    context.lineTo(path[i].x, path[i].y);
  }
  context.strokeStyle = fillStyle;
  context.lineWidth = lineWidth;
  context.stroke();

  return {
    shape: Shapes.pencil,
    fillStyle,
  };
};
