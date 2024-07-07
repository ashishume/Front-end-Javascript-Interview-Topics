import { Shapes } from "./constants";
import { IPayload } from "./model";
import { createCircle } from "./Shapes/circle";
import { createRectangle } from "./Shapes/rectangle";

export const renderShapes = (
  data: IPayload[],
  context: CanvasRenderingContext2D,
) => {
  data.map(
    ({ x, y, height, width, id, shape, fillStyle, strokeStyle, points }) => {
      switch (shape) {
        case Shapes.rectangle: {
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
          break;
        }
        case Shapes.circle: {
          const centerX = x + width / 2;
          const centerY = y + height / 2;

          createCircle(
            context,
            centerX,
            centerY,
            Math.abs(width / 2),
            Math.abs(height / 2),
            fillStyle,
            strokeStyle,
            2,
            true
          );
          break;
        }
        case Shapes.title: {
          break;
        }

        case Shapes.pencil: {
          if (points && points.length > 0) {
            context.strokeStyle = strokeStyle;
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
              context.lineTo(points[i].x, points[i].y);
            }
            context.stroke();
          }
          break;
        }
        default: {
          break;
        }
      }
    }
  );
};
