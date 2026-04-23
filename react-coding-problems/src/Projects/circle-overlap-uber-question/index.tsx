import { useRef, useState } from 'react';

export interface ICircle {
  id: number;
  x: number;
  y: number;
  color: string;
  radius: number;
  opacity: number;
}

const CircleOverlap = () => {
  // Stores all finalized circles that should remain visible on the canvas.
  const [circles, setCircles] = useState([] as ICircle[]);
  // Tracks the circle currently being drawn (between mouse down and mouse up).
  const [current, setCurrent] = useState(null as ICircle);
  // Points to the drawing area so we can convert viewport coordinates to local coordinates.
  const containerRef = useRef(null);

  const getPointerPos = (e) => {
    // Mouse events provide viewport coordinates; convert them to coordinates
    // relative to the container so circles are positioned correctly.
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  const handleMouseDown = (e) => {
    // Start a new circle at the pointer location with radius 0.
    // Radius will grow while the pointer moves.
    const { x, y } = getPointerPos(e);
    setCurrent({
      ...current,
      x,
      y,
      radius: 0
    });
  };
  const handleMouseMove = (e) => {
    if (!current) return;
    // While dragging, compute radius as Euclidean distance between:
    // - circle center (from mouse down)
    // - current pointer position
    const { x, y } = getPointerPos(e);
    const dx = x - current.x;
    const dy = y - current.y;
    const radius = Math.sqrt(dx * dx + dy * dy);
    setCurrent({
      ...current,
      radius
    });
  };

  const handleMouseUp = (e) => {
    if (!current) return;

    // Default to green, then switch to red if overlap is detected.
    let newCircle = { ...current, color: 'green' };

    // Two circles overlap when distance between centers is less than
    // the sum of their radii.
    const updated = circles.map((circle) => {
      const dx = circle.x - newCircle.x;
      const dy = circle.y - newCircle.y;

      
      const overlap = Math.sqrt(dx * dx + dy * dy) < circle.radius + newCircle.radius;

      if (overlap) {
        newCircle.color = 'red';
        // Existing circles are unchanged; only the newly created circle color changes.
        return {
          ...circle
        };
      }

      return circle;
    });
    setCircles([...updated, newCircle]);
    setCurrent(null);
  };
  return (
    <>
      <div
        className="h-screen w-screen bg-red-100"
        ref={containerRef}
        // Mouse down: define center. Mouse move: change radius. Mouse up: finalize.
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {circles.map((circle, i) => {
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: circle.x - circle.radius,
                top: circle.y - circle.radius,
                width: circle.radius * 2,
                height: circle.radius * 2,
                borderRadius: '50%',
                backgroundColor: circle?.color || 'white',
                opacity: circle?.opacity || 0.6
              }}
            />
          );
        })}

        {current && (
          <div
            style={{
              position: 'absolute',
              left: current.x - current.radius,
              top: current.y - current.radius,
              width: current.radius * 2,
              height: current.radius * 2,
              borderRadius: '50%',
              border: 'solid 1px black'
            }}
          ></div>
        )}
      </div>
    </>
  );
};

export default CircleOverlap;
