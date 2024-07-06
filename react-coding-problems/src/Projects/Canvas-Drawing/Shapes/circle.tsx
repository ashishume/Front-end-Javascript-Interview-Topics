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
  if (isRendering) {
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  } else {
    context.beginPath();
    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;

    // Ensure the drawing context is ready to draw an ellipse
    context.save(); // Save the current state of transformation
    context.translate(centerX, centerY); // Translate to the center point
    context.scale(radiusX / radiusY, 1); // Scale the context horizontally to create the ellipse

    // Draw the ellipse
    context.beginPath();
    context.arc(0, 0, radiusY, 0, Math.PI * 2);
    context.closePath();

    // Restore the previous transformation state
    context.restore();
  }

  context.fill(); // Fill the ellipse
  context.stroke(); // Stroke the ellipse

  return {
    shape: Shapes.circle,
    fillStyle,
    strokeStyle,
  };
};
