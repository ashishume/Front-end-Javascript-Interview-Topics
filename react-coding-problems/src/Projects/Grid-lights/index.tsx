// import { useState } from "react";
// import "./styles.scss";
// const GridLights = () => {
//   const [data, setData] = useState([] as any);
//   /** fill array from 1 to 9 */
//   const arr = new Array(9).fill(9).map((_, index) => index + 1);

//   function activateCells(value: number) {
//     /** check for duplicate data */
//     if (!data.includes(value)) {
//       const newUpdatedData = [...data, value];

//       setData(newUpdatedData);
//       let timer: any;

//       /** when all are selected remove highlight in reverse order  */
//       if (newUpdatedData?.length === arr.length) {
//         timer = setInterval(() => {
//           setData((oldData: any) => {
//             const newData = oldData.slice(0, -1);
//             if (newData.length === 0) {
//               clearInterval(timer);
//             }
//             return newData;
//           });
//         }, 500);
//       }
//     }
//   }
//   return (
//     <div className="grid-light-container">
//       <h2>GridLights</h2>
//       <div className="content">
//         {arr.map((value) => {
//           return (
//             <div
//               key={value}
//               className={`child ${data.includes(value) ? "active" : ""}`}
//               onClick={() => activateCells(value)}
//             ></div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default GridLights;

import { useEffect, useState } from "react";

/** 1 is visible and 0 is non-visible */
const BOX_DATA = [
  [1, 1, 0],
  [1, 0, 0],
  [1, 1, 1],
];

const InteractiveShape = () => {
  /** set the data items with bool false default value */
  const [activeItems, setActiveItems] = useState<boolean[][]>(
    BOX_DATA.map((row) => {
      return row.map((col) => {
        return col === 1 ? false : true; //if cell is hidden mark it true by default else false
      });
    })
  );

  /** mark each cell as true */
  const handleClick = (i: number, j: number) => {
    console.log(i, j);
    //TODO: maintain order
    setActiveItems((prev) => {
      const newArr = prev.map((row) => [...row]);
      newArr[i][j] = true;
      return newArr;
    });
  };

  useEffect(() => {
    let timer;
    if (_checkIfAllVisibleItemsSelected(activeItems)) {
      timer = setInterval(() => {}, 500);
    }
  }, [activeItems]);

  const _checkIfAllVisibleItemsSelected = (arr: boolean[][]) => {
    return arr.every((row) => row.every((v) => v === true));
  };

  return (
    <div className="container">
      <div className="m-4">
        {BOX_DATA.map((row, i) => {
          return (
            <div className="flex flex-row gap-2" key={i}>
              {row.map((col, j) => {
                return (
                  <div
                    key={j}
                    className={`border-4 rounded p-1 w-20 h-20 text-center flex flex-row justify-center items-center m-2 ${
                      activeItems[i][j] ? "bg-slate-500" : ""
                    } ${col === 0 ? "hidden" : ""}`}
                    onClick={() => handleClick(i, j)}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveShape;
