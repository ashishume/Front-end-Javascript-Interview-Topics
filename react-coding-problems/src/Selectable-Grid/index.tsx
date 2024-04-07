import { useState } from "react";
import "./style.scss";
const SelectableGrid = () => {
  const [isMouseDown, setMouseDown] = useState(false);
  const [firstItemSelected, setFirstItemSelected] = useState(null as any);
  const maxLength = 200;
  /** fill an array from 1 to 200 */
  const arr = new Array(maxLength)
    .fill(maxLength)
    .map((_, i) => ({ value: i + 1, isFilled: false }));

  const [data, setData] = useState(arr);
  function startDragging(e: any, item: any) {
    /** reset previous data */
    setData(arr);
    /** set the first item selected */
    setFirstItemSelected(item.value);

    /** set mouse down */
    setMouseDown(true);
  }

  /** start filling the boxes wherever mouse is hovered */
  function hoverBox({ value }:any) {
    if (isMouseDown) {
      /** get the min item, from where user starts dragging (it could be top to down or bottom to top) */
      const startValue = Math.min(firstItemSelected, value);

      /** get the max value vice versa to the above */
      const endValue = Math.max(firstItemSelected, value);

      setData((prev) => {
        return prev.map((prevItem) => {
          /** if the item is within the range of the min and max then mark the box as filled */
          if (prevItem.value >= startValue && prevItem.value <= endValue) {
            return {
              ...prevItem,
              isFilled: true,
            };
          }
          return prevItem;
        });
      });
    }
  }
  return (
    <div className="selectable-grid-container" draggable="false">
      <h2>SeletableGrid</h2>
      <div className="content" onMouseLeave={() => setMouseDown(false)}>
        {data.map((item) => {
          return (
            <div
              key={item.value}
              className={`child ${item.isFilled ? "active" : ""}`}
              onMouseDown={(e) => startDragging(e, item)}
              onMouseUp={(e) => setMouseDown(false)}
              onMouseEnter={(e) => hoverBox(item)}
            >
              {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectableGrid;
