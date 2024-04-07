import { ReactElement } from "react";
import App from "../App";

import Pagination from "../Pagination";
import ParentForm from "../React-hook-form/ParentForm";
import LazyParentComp from "../CodeSplitting";
import Phone from "../OTP-login";
import SSRPagination from "../Table-Pagination-SSR";
import ReduxIndex from "../Redux";
import { Provider } from "react-redux";
import reduxStore from "../Redux/store";
import reduxSliceStore from "../Redux-Slices/store";
import ReduxSliceIndex from "../Redux-Slices";
import PureClassBasedComponent from "../Pure-Components";
import DarkModeRoutes from "../DarkMode/dark-mode-routes";
import ThemeLayout from "../DarkMode/theme";
import EcommerceRoutes from "../e-commerce/ecommerce-routes";
import CommentsSection from "../CommentsSection(incomplete)";


export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  { routeName: "/", component: <App /> },
  {
    routeName: "/dark-mode/*",
    component: (
      <ThemeLayout>
        <DarkModeRoutes />
      </ThemeLayout>
    ),
  },
  { routeName: "/comments-section", component: <CommentsSection /> },
  { routeName: "/table-ssr-pagination", component: <SSRPagination /> },
  {
    routeName: "/redux",
    component: (
      <Provider store={reduxStore}>
        <ReduxIndex />
      </Provider>
    ),
  },
  {
    routeName: "/redux-slice",
    component: (
      <Provider store={reduxSliceStore}>
        <ReduxSliceIndex />
      </Provider>
    ),
  },
  { routeName: "/pure-component", component: <PureClassBasedComponent /> },
  { routeName: "/otp-login", component: <Phone /> },
  { routeName: "/react-hook-form", component: <ParentForm /> },
  { routeName: "/ecommerce/*", component: <EcommerceRoutes /> },
  { routeName: "/pagination", component: <Pagination /> },
  { routeName: "code-splitting", component: <LazyParentComp /> },
];
