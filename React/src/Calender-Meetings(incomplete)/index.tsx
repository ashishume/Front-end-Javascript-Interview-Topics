import React, { useState } from "react";
import "./style.scss";
const CalenderMeetings = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [partialActiveIndex, setPartialActiveIndex] = useState(null);
  let timeline = [];
  for (let hour = 0; hour < 24; hour++) {
    let newHour = hour % 24;
    let formattedHr = "";
    if (newHour === 0) {
      formattedHr = "12:00 AM";
    } else if (newHour < 12) {
      formattedHr = ("0" + newHour).slice(-2) + ":00 AM";
    } else if (newHour === 12) {
      formattedHr = "12:00 PM";
    } else {
      formattedHr = ("0" + (newHour - 12)).slice(-2) + ":00 PM";
    }
    timeline.push(formattedHr);
  }
  function onOneHourSlot(e: any, index: any) {
    console.log("1");
    setPartialActiveIndex(null);
    setActiveIndex(index);
  }
  function onHalfHourSlot(e: any, index: any) {
    console.log("half");
    setActiveIndex(null);
    setPartialActiveIndex(index);
  }
  console.log("index", activeIndex);
  console.log("partial", partialActiveIndex);

  return (
    <div className="calender-container">
      {timeline.map((time, index) => {
        return (
          <div
            className={`time-slots-container ${
              index === activeIndex ? "active" : null
            }`}
            key={time}
          >
            <div className="time-slots">
              {/* <div
                style={{
                  float: "right",
                  marginRight: "10px",
                }}
              >
                Index: {index}
              </div> */}

              {/* {index % 2 !== 0 ? (
                <div
                  onClick={(e) => onHalfHourSlot(e, index)}
                  className={`partial-time-slots ${
                    partialActiveIndex === index ? "active" : null
                  }`}
                ></div>
              ) : null} */}
              <div onClick={(e) => onOneHourSlot(e, index)} className="time-value">{time}</div>
                <hr className="horizontal-border"></hr>
              {/* {index % 2 === 0 ? (
                <div
                  onClick={(e) => onHalfHourSlot(e, index)}
                  className={`partial-time-slots ${
                    partialActiveIndex === index ? "active" : null
                  }`}
                ></div>
              ) : null} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalenderMeetings;
