import { Fragment, useEffect, useRef, useState } from "react";
import tick from "./tick.png";
import "./style.scss";
import { Button } from "@mui/material";
const MultiStepper = () => {
  const ref = useRef([] as any);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const stepper = [
    {
      stepName: "Customer Info",
      index: 0,
    },
    {
      stepName: "Shipping Info",
      index: 1,
    },
    {
      stepName: "Payment",
      index: 2,
    },
    {
      stepName: "Review",
      index: 3,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  /** continue the steps */
  const continueStep = () => {
    if (activeIndex < stepper.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  /**
   * calculate the percent based on elements position from the screen
   * @param element
   * @returns
   */
  function calculatePercentage(element: HTMLDivElement) {
    const elementRect = element.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    /** get elements center position */
    const elementX = elementRect.left + elementRect.width / 2;
    const containerLeft = containerRect?.left as number;
    const containerWidth = containerRect?.width as number;

    // calculate the percent based on screen width for the element's position
    const percentage = ((elementX - containerLeft) / containerWidth) * 100;
    return percentage;
  }

  /** render the steps content */
  const renderContent = () => {
    switch (activeIndex) {
      case 0: {
        return (
          <div className="content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
            optio error deserunt eum delectus nam incidunt recusandae dicta
            mollitia minus adipisci. Perspiciatis aperiam tenetur necessitatibus
            totam adipisci velit itaque quos? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. A facilis, alias dolore vel eius dicta
            mollitia, dolor quibusdam adipisci id maiores blanditiis harum
            corrupti pariatur, veritatis quod cumque ab nam.
            <div>
              <Button variant="contained" onClick={() => continueStep()}>
                Continue
              </Button>
            </div>
          </div>
        );
      }
      case 1: {
        return (
          <div className="content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
            optio error deserunt eum delectus nam incidunt recusandae dicta
            mollitia minus adipisci. Perspiciatis aperiam tenetur necessitatibus
            totam adipisci velit itaque quos? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Fugiat, optio error deserunt eum
            delectus nam incidunt recusandae dicta mollitia minus adipisci.
            Perspiciatis aperiam tenetur necessitatibus totam adipisci velit
            itaque quos? Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Fugiat, optio error deserunt eum delectus nam incidunt
            recusandae dicta mollitia minus adipisci. Perspiciatis aperiam
            tenetur necessitatibus totam adipisci velit itaque quos? Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Fugiat, optio error
            deserunt eum delectus nam incidunt recusandae dicta mollitia minus
            adipisci. Perspiciatis aperiam tenetur necessitatibus totam adipisci
            velit itaque quos?
            <div>
              <Button variant="contained" onClick={() => continueStep()}>
                Continue
              </Button>
            </div>
          </div>
        );
      }
      case 2: {
        return (
          <div className="content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
            optio error deserunt eum delectus nam incidunt recusandae dicta
            mollitia minus adipisci. Perspiciatis aperiam tenetur necessitatibus
            totam adipisci velit itaque quos? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Fugiat, optio error deserunt eum
            delectus nam incidunt recusandae dicta mollitia minus adipisci.
            Perspiciatis aperiam tenetur necessitatibus totam adipisci velit
            itaque quos? Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Fugiat, optio error deserunt eum delectus nam incidunt
            recusandae dicta mollitia minus adipisci. Perspiciatis aperiam
            tenetur necessitatibus totam adipisci velit itaque quos? Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Fugiat, optio error
            deserunt eum delectus nam incidunt recusandae dicta mollitia minus
            adipisci. Perspiciatis aperiam tenetur necessitatibus totam adipisci
            velit itaque quos? Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Fugiat, optio error deserunt eum delectus nam
            incidunt recusandae dicta mollitia minus adipisci. Perspiciatis
            aperiam tenetur necessitatibus totam adipisci velit itaque quos?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
            optio error deserunt eum delectus nam incidunt recusandae dicta
            mollitia minus adipisci. Perspiciatis aperiam tenetur necessitatibus
            totam adipisci velit itaque quos? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Fugiat, optio error deserunt eum
            delectus nam incidunt recusandae dicta mollitia minus adipisci.
            Perspiciatis aperiam tenetur necessitatibus totam adipisci velit
            itaque quos?
            <div>
              <Button variant="contained" onClick={() => continueStep()}>
                Continue
              </Button>
            </div>
          </div>
        );
      }
      case 3: {
        return (
          <div className="content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
            optio error deserunt eum delectus nam incidunt recusandae dicta
            mollitia minus adipisci. Perspiciatis aperiam tenetur necessitatibus
            totam adipisci velit itaque quos? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Fugiat, optio error deserunt eum
            delectus nam incidunt recusandae dicta mollitia minus adipisci.
            Perspiciatis aperiam tenetur necessitatibus totam adipisci velit
            itaque quos? Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Fugiat, optio error deserunt eum delectus nam incidunt
            recusandae dicta mollitia minus adipisci. Perspiciatis aperiam
            tenetur necessitatibus totam adipisci velit itaque quos? Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Fugiat, optio error
            deserunt eum delectus nam incidunt recusandae dicta mollitia minus
            adipisci. Perspiciatis aperiam tenetur necessitatibus totam adipisci
            velit itaque quos? Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Fugiat, optio error deserunt eum delectus nam
            incidunt recusandae dicta mollitia minus adipisci. Perspiciatis
            aperiam tenetur necessitatibus totam adipisci velit itaque quos?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
            optio error deserunt eum delectus nam incidunt recusandae dicta
            mollitia minus adipisci. Perspiciatis aperiam tenetur necessitatibus
            totam adipisci velit itaque quos? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Fugiat, optio error deserunt eum
            delectus nam incidunt recusandae dicta mollitia minus adipisci.
            Perspiciatis aperiam tenetur necessitatibus totam adipisci velit
            itaque quos? Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Fugiat, optio error deserunt eum delectus nam incidunt
            recusandae dicta mollitia minus adipisci. Perspiciatis aperiam
            tenetur necessitatibus totam adipisci velit itaque quos? Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Fugiat, optio error
            deserunt eum delectus nam incidunt recusandae dicta mollitia minus
            adipisci. Perspiciatis aperiam tenetur necessitatibus totam adipisci
            velit itaque quos?
            <div>
              <Button variant="contained" onClick={() => continueStep()}>
                Continue
              </Button>
            </div>
          </div>
        );
      }
    }
  };

  useEffect(() => {
    const currentStepElement = ref.current[activeIndex];
    setProgressPercent(calculatePercentage(currentStepElement));
  }, [ref.current, activeIndex]);

  return (
    <div className="multi-stepper-container" ref={containerRef}>
      <div
        className="horizontal-bar"
        style={{
          width: `${progressPercent}%`,
        }}
      ></div>
      <div className="flex justify-between">
        {stepper.map(({ stepName, index }) => {
          return (
            <Fragment key={index}>
              <div
                className="flex flex-col items-center gap-1 z-[1]"
                key={index}
              >
                <div
                  className="rounded-full w-[50px] h-[50px] bg-slate-400"
                  ref={(element) => (ref.current[index] = element)}
                >
                  {activeIndex === index || activeIndex >= index ? (
                    <img src={tick} />
                  ) : null}
                </div>
                <div>{stepName}</div>
              </div>
            </Fragment>
          );
        })}
      </div>
      {renderContent()}
    </div>
  );
};

export default MultiStepper;
