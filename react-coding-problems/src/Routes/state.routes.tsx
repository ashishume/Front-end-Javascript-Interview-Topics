import { Provider } from "react-redux";
import ThemeLayout from "@/Projects/DarkMode/theme";
import DarkModeRoutes from "@/Projects/DarkMode/dark-mode-routes";
import FeatureFlag from "@/Projects/FeatureFlag";
import HomePageFeatureFlag from "@/Projects/FeatureFlag/HomePage";
import ReduxIndex from "@/Projects/Redux";
import store from "@/Projects/Redux/store";
import ReduxSliceIndex from "@/Projects/Redux-Slices";
import reduxSliceStore from "@/Projects/Redux-Slices/store";
import ZustandDemo from "@/Projects/Zustand-demo";
import ReactQueryLibrary from "@/Projects/React-Query-Third-party-library";
import { AppRoute } from "./route.types";

const sourceFile = "state.routes.tsx";

export const stateRoutes: AppRoute[] = [
  { routeName: "/react-query", component: <ReactQueryLibrary />, sourceFile },
  { routeName: "/zustand-demo", component: <ZustandDemo />, sourceFile },
  {
    routeName: "/dark-mode/*",
    component: (
      <ThemeLayout>
        <DarkModeRoutes />
      </ThemeLayout>
    ),
    sourceFile,
  },
  {
    routeName: "/feature-flag",
    component: (
      <FeatureFlag>
        <HomePageFeatureFlag />
      </FeatureFlag>
    ),
    sourceFile,
  },
  {
    routeName: "/redux",
    component: (
      <Provider store={store}>
        <ReduxIndex />
      </Provider>
    ),
    sourceFile,
  },
  {
    routeName: "/redux-slice",
    component: (
      <Provider store={reduxSliceStore}>
        <ReduxSliceIndex />
      </Provider>
    ),
    sourceFile,
  },
];
