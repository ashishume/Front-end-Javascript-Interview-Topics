import ReactDOM from "react-dom";
import React from "react";
import Routing from "./Routing/Routing";
import { Provider } from "react-redux";
import { store } from "./Projects/e-commerce/store";
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  // </React.StrictMode>
);
