import { useEffect, useState } from 'react';

/** 1 is visible and 0 is non-visible */
const BOX_DATA = [
  [1, 1, 0],
  [1, 0, 0],
  [1, 1, 1]
];

const InteractiveShape = () => {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [isActive, setActive] = useState(false);
  const handleClick = (index) => {
    setSelectedBoxes((prev) => [...prev, index]);
  };

  let timer;
  useEffect(() => {
    if (BOX_DATA.flat(1).filter((v) => v === 1)?.length === selectedBoxes.length) {
      timer = setInterval(() => {
        setSelectedBoxes((prev) => {
          const arr = prev.slice(0, -1);
          setActive(true);
          if (arr.length === 0) {
            clearInterval(timer);
            setActive(false);
          }
          return arr;
        });
      }, 500);
    }
  }, [selectedBoxes]);
  return (
    <div className="container w-[500px] h-[500px]">
      <div className="grid grid-cols-3">
        {BOX_DATA.flat(1).map((boxItem, i) => {
          return (
            <div key={i}>
              {boxItem === 1 && (
                <div
                  onClick={() => (!selectedBoxes.includes(i) ? handleClick(i) : null)}
                  className="bg-green-100 border h-[100px] w-[100px] hover:bg-green-400 m-4 flex justify-center items-center"
                  style={{
                    ...(selectedBoxes.includes(i) ? { backgroundColor: 'green' } : {}),
                    ...(isActive ? { pointerEvents: 'none' } : {})
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveShape;
