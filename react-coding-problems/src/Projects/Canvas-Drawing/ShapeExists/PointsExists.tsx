import { IPayload } from "../model";

export const isPointInRectangle = (x: number, y: number, element: IPayload) => {
  return (
    x >= element.x &&
    x <= element.x + element.width &&
    y >= element.y &&
    y <= element.y + element.height
  );
};

export const isPointInCircle = (x: number, y: number, element: IPayload) => {
  const centerX = element.x + element.width / 2;
  const centerY = element.y + element.height / 2;
  const radiusX = element.width / 2;
  const radiusY = element.height / 2;
  const normalizedX = (x - centerX) / radiusX;
  const normalizedY = (y - centerY) / radiusY;
  return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
};

// export const isPointInText = (x: number, y: number, text: any) => {
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
