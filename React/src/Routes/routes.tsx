import { ReactElement } from "react";
import App from "../App";

import ParentForm from "../React-hook-form/ParentForm";
import EcommerceRoutes from "../e-commerce/ecommerce-routes";


export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  { routeName: "/", component: <App /> },
  { routeName: "/react-hook-form", component: <ParentForm /> },
  { routeName: "/ecommerce/*", component: <EcommerceRoutes /> },
];
