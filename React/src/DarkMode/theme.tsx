import React, { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext("light-mode");
const ThemeLayout = ({ children }: any) => {
  const [theme, setTheme] = useState(false);
  const toggleDarkMode = () => {
    setTheme(!theme);
  };
  const mode = theme ? "dark-mode" : "light-mode";
  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
  }, [theme]);
  return (
    <ThemeContext.Provider value={mode}>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeLayout;
