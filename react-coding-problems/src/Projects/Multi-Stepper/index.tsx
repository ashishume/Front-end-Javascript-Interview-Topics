import React, { useEffect, useState } from "react";
import "./style.scss";
import tick from './tick.png';
import { Button } from "@/components/ui/button";
const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div> Your order has been delivered.</div>,
  },
];
const MultiStepper = () => {
  const [isCompleted, setCompleted] = useState({} as any);
  const [active, setActive] = useState(0);
  const [progressWidth, setProgress] = useState(null as any);
  const ref = React.useRef([] as any);
  function continueStep(value: any) {
    setActive((prev) => prev + 1);
    setCompleted((prev: any) => ({
      ...prev,
      [value.name]: true,
    }));
  }

  useEffect(() => {
    if (active < CHECKOUT_STEPS?.length) {
      const bounds = ref.current[active].getBoundingClientRect();
      setProgress(bounds);
    }
    if (active === CHECKOUT_STEPS?.length) {
      setProgress({ left: "100%" }); // TODO: need to align with left bounds here 100% is a hacky way
    }
  }, [isCompleted]);

  return (
    <div className="stepper-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: progressWidth?.left,
          }}
        ></div>
      </div>
      <div className="steps-content">
        {CHECKOUT_STEPS.map((value, index) => {
          return (
            <div key={value.name} className="step-container">
              <div className="step">
                {isCompleted[value.name] ? (
                  <img src={tick} height="40" width="40" />
                ) : (
                  <div className="step-number">{index + 1}</div>
                )}
                <div ref={(element) => (ref.current[index] = element)}>
                  {value.name}
                </div>
              </div>
              <div>
                {active === index ? (
                  <Button onClick={() => continueStep(value)}>Continue</Button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiStepper;
