import { ReactElement } from "react";
import App from "../App";

// import ParentForm from "../../../react-coding-problems/src/Projects/React-hook-form/ParentForm";


export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  { routeName: "/", component: <App /> },
  // { routeName: "/react-hook-form", component: <ParentForm /> },
];
