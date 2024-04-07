import { Route, Routes } from "react-router-dom";
import ModeHome from "./home";
import DarkMode from ".";

const DarkModeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ModeHome />} />
      <Route path="/home" element={<DarkMode />} />
    </Routes>
  );
};

export default DarkModeRoutes;
