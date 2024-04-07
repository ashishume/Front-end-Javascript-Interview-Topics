import { ReactElement } from "react";
import App from "../App";

import ParentForm from "../React-hook-form/ParentForm";
import EcommerceRoutes from "../e-commerce/ecommerce-routes";
import CommentsSection from "../CommentsSection(incomplete)";


export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  { routeName: "/", component: <App /> },
  { routeName: "/comments-section", component: <CommentsSection /> },
  { routeName: "/react-hook-form", component: <ParentForm /> },
  { routeName: "/ecommerce/*", component: <EcommerceRoutes /> },
];
