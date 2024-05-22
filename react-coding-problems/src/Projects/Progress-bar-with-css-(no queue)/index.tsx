import './style.scss';
import { useState, useEffect } from 'react';

export default function SimpleProgressBarComp() {

  const [bars, setBars] = useState(0)

  return (
    <div>
      <button onClick={() => setBars(prev => prev + 1)}>Add</button>
      {
        new Array(bars).fill(null).map((_, index) => {
          return <ProgressBars key={index} />
        })

      }
    </div>
  );
}


export function ProgressBars() {
  const [start, setStart] = useState(false)
  useEffect(() => {
    if (start) {
      return;
    }
    setStart(true)
  })
  return <div className="simple-bar-container">
    <div className={`simple-progress ${start ? 'filled' : null}`}></div>
  </div>
}