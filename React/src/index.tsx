import Routing from "./Routing/Routing";
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
root.render(
  // <React.StrictMode>
      <Routing />
  // </React.StrictMode>
);
