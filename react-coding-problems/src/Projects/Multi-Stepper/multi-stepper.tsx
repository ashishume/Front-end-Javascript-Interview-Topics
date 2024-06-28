import { useEffect, useRef, useState } from "react";
import tick from "./tick.png";
import "./style.scss";
import { Button } from "@mui/material";
const MultiStepper = () => {
  const ref = useRef([] as any);
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

  const continueStep = () => {
    if (activeIndex < stepper.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

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
    const currElementBounds = ref.current[activeIndex]?.getBoundingClientRect();
    console.log(currElementBounds);
  }, [ref.current, activeIndex]);

  
  return (
    <div className="container">
      <div className="horizontal-bar"></div>
      <div className="flex justify-between">
        {stepper.map(({ stepName, index }) => {
          return (
            <div
              className="flex flex-col items-center gap-1 z-[1]"
              key={index}
              ref={(element) => (ref.current[index] = element)}
            >
              <div className="rounded-full w-[50px] h-[50px] bg-slate-400">
                {activeIndex === index ? <img src={tick} /> : null}
              </div>
              <div>{stepName}</div>
            </div>
          );
        })}
      </div>
      {renderContent()}
    </div>
  );
};

export default MultiStepper;
