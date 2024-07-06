import { Shapes } from "../constants";

export const createCircle = (
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  fillStyle: string,
  strokeStyle: string,
  lineWidth: number,
  isRendering: boolean = false
) => {

  context.save(); // Save the current state of the context
  context.beginPath();
  context.fillStyle = fillStyle;
  context.strokeStyle = strokeStyle;
  context.lineWidth = lineWidth;
  
  if (isRendering) {
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  } else {
    context.translate(centerX, centerY); // Translate to the center point
    context.scale(radiusX / radiusY, 1); // Scale the context horizontally to create the ellipse
    context.arc(0, 0, radiusY, 0, Math.PI * 2); // Draw the ellipse
  }

  context.fill(); // Fill the ellipse
  context.stroke(); // Stroke the ellipse
  context.restore(); // Restore the previous state of the context

  return {
    shape: Shapes.circle,
    fillStyle,
    strokeStyle,
  };
};
