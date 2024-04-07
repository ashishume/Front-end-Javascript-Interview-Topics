import { useState } from "react";
import "./styles.scss";
const GridLights = () => {
  const [data, setData] = useState([] as any);
  /** fill array from 1 to 9 */
  const arr = new Array(9).fill(9).map((_, index) => index + 1);

  function activateCells(value: number) {
    /** check for duplicate data */
    if (!data.includes(value)) {
      const newUpdatedData = [...data, value];

      setData(newUpdatedData);
      let timer: any;

      /** when all are selected remove highlight in reverse order  */
      if (newUpdatedData?.length === arr.length) {
        timer = setInterval(() => {
          setData((oldData: any) => {
            const newData = oldData.slice(0, -1);
            if (newData.length === 0) {
              clearInterval(timer);
            }
            return newData;
          });
        }, 500);
      }
    }
  }
  return (
    <div className="grid-light-container">
      <h2>GridLights</h2>
      <div className="content">
        {arr.map((value) => {
          return (
            <div
              key={value}
              className={`child ${data.includes(value) ? "active" : ""}`}
              onClick={() => activateCells(value)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default GridLights;
