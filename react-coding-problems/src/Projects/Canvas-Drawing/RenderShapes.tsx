import { Shapes } from "./constants";
import { IPayload } from "./model";
import { createCircle } from "./Shapes/circle";
import { drawPencilPath } from "./Shapes/Pencil";
import { createRectangle } from "./Shapes/rectangle";

export const renderShapes = (
  data: IPayload[],
  context: CanvasRenderingContext2D
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
            drawPencilPath(context, points, strokeStyle, 2);
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
