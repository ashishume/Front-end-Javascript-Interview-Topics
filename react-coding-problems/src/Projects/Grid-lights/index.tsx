import { useEffect, useState } from "react";

/** 1 is visible and 0 is non-visible */
const BOX_DATA = [
  [1, 1, 0],
  [1, 0, 0],
  [1, 1, 1],
];

const InteractiveShape = () => {
  /** set the data items with bool false default value */
  const [activeItems, setActiveItems] = useState<number[]>([]);

  /** mark each cell as true */
  const handleClick = (index: number) => {
    if (!activeItems.includes(index)) {
      setActiveItems((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    let timer: any;
    if (allVisibleItemsLen() === activeItems.length) {
      timer = setInterval(() => {
        setActiveItems((prev) => {
          const newArr = prev.slice(0, -1);
          if (newArr.length === 0) {
            clearInterval(timer);
          }
          return newArr;
        });
      }, 500);
    }
  }, [activeItems]);

  const allVisibleItemsLen = () => {
    return BOX_DATA.flat(1).filter((v) => v === 1)?.length;
  };

  return (
    <div className="container">
      <div className="inline-grid grid-cols-3 gap-4 ">
        {BOX_DATA.flat(1).map((row, index) => {
          return (
            <div key={index}>
              <div
                key={index}
                className={`border-4 rounded p-1 w-20 h-20 text-center flex flex-row justify-center items-center m-2 ${
                  activeItems.includes(index) ? "bg-slate-500" : ""
                } ${row === 0 ? "hidden" : ""}`}
                onClick={() => handleClick(index)}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveShape;
