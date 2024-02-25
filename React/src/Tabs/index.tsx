import React, { useState } from "react";
import style from "./styles.module.scss";

const TabConent = ({ children }: any) => {
  return <>{children}</>;
};

const CustomTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      index: 0,
      title: "Tab 1",
      content:
        "1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima ccusamus, minus accusantium veritatis reiciendis harum nulla non a! Temporibus, mollitia in! Recusandae quam consectetur ipsa.",
    },
    {
      index: 1,
      title: "Tab 2",

      content:
        "2 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta eveniet sint odit saepe modi iusto.",
    },
    {
      index: 2,
      title: "Tab 3",
      content:
        "3 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque voluptatem sint minus qui ut possimus quo libero nihil eaque? Iure, molestias ullam tempora quam officia vitae et esse incidunt. Placeat voluptatibus incidunt tempore consectetur voluptates amet dolores delectus atque accusamus!",
    },
  ];

  function handleTabClick(index: any) {
    setActiveIndex(index);
  }
  return (
    <>
      <div className="tabs-container">
        {tabs.map(({ title, index, content }) => {
          return (
            <button
              className={index === activeIndex ? style["active"] : ""}
              key={index}
              onClick={() => handleTabClick(index)}
            >
              {title}
            </button>
          );
        })}

        <div className="tabs-content">{tabs[activeIndex].content}</div>
      </div>
    </>
  );
};

export default CustomTabs;
