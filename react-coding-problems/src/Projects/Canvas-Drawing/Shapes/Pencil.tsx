import { Shapes } from "../constants";
import { IPosition } from "../model";

export const drawPencilPath = (
  context: CanvasRenderingContext2D,
  points: IPosition[],
  strokeStyle: string,
  lineWidth: number,
) => {
  context.strokeStyle = strokeStyle;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.stroke();

  return {
    shape: Shapes.pencil,
    strokeStyle,
    points,
  };
};
