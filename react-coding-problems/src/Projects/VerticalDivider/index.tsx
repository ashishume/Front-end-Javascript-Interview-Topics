import { useState } from "react";
import "./style.scss";
const VerticalDivider = () => {
  const [leftWidth, setLeftWidth] = useState(50);
  const handleMovement = () => {
    document.addEventListener("mousemove", handleResizer);

    document.addEventListener("mouseup", (e) => {
      document.removeEventListener("mousemove", handleResizer);
    });
  };

  function handleResizer(e: any) {
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    setLeftWidth(newLeftWidth);
  }
  return (
    <div className="divider-container">
      <div
        className="left-panel"
        style={{
          width: `${leftWidth}%`,
        }}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga nulla
        totam unde, iusto necessitatibus iure repellat aliquam facilis quasi
        magni voluptate, ex, est quibusdam voluptates sint veniam quos alias?
        Atque.
      </div>
      <div className="divider" onMouseDown={handleMovement}></div>
      <div
        className="right-panel"
        style={{
          width: `${100 - leftWidth}%`,
        }}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, cumque
        quo error dolores itaque rem saepe reprehenderit, nemo inventore,
        dolorem accusantium odit tenetur odio cum laboriosam consectetur.
        Voluptatibus, in fugiat! Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Dolorem obcaecati aspernatur amet praesentium debitis
        dicta illum illo, fuga et rerum nesciunt harum doloribus, doloremque
        corrupti unde consectetur optio quo a!
      </div>
    </div>
  );
};

export default VerticalDivider;
