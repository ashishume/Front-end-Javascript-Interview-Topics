import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { ThemeContext } from "./theme";
const DarkMode = () => {
  const theme = useContext(ThemeContext);
  /** theme context is wrapped in router file to make both child context provider */
  return (
    <div className={`dark-mode-container ${theme}`}>
      <div className="dark-mode-content">
        <div className="dark-mode-left-sidebar">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quisquam
          suscipit laudantium hic, consequuntur corrupti minima excepturi dolor
          similique consequatur eos totam, quae iure voluptas?
        </div>
        <div className="dark-mode-right-sidebar">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          ipsam nam laudantium laborum illo minus. Ad, fuga possimus, ex
          voluptate aliquid aspernatur quod veritatis a eaque beatae inventore,
          libero ducimus.
        </div>
      </div>
    </div>
  );
};

export default DarkMode;
