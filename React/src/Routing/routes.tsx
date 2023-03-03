import React, { ReactElement } from "react";
import { FolderData } from "../Projects/FolderStructure(Recursive)/FolderData";
const App = React.lazy(() => import("../App"));
const Photo = React.lazy(() => import("../Projects/Tag/Photo"));
const Input = React.lazy(() => import("../Projects/hooks/customHooks/input"));
const UseCallbackHook = React.lazy(
  () => import("../Projects/hooks/UseCallback/useCallback")
);
const UseContext = React.lazy(() => import("../Projects/hooks/UseContext"));
const Factorial = React.lazy(() => import("../Projects/hooks/useMemo"));
const UseMemo2 = React.lazy(() => import("../Projects/hooks/useMemo2"));
const StopWatch = React.lazy(() => import("../Projects/hooks/useReducer"));
const UseRef = React.lazy(() => import("../Projects/hooks/useRef"));
const AxiosContainer = React.lazy(() => import("../Projects/Axios"));
const FolderComponent = React.lazy(
  () => import("../Projects/FolderStructure(Recursive)/FolderComponent")
);
const InfiniteScrolls = React.lazy(() => import("../Projects/Infinite-Scroll"));
const Parent = React.lazy(
  () => import("../Projects/hooks/UseCallback(2nd example)/Parent")
);
const Dashboard = React.lazy(
  () => import("../Projects/e-commerce/components/dashboard")
);
const Cart = React.lazy(() => import("../Projects/e-commerce/containers/cart"));
const FolderStructure = React.lazy(
  () =>
    import(
      "../Projects/FolderStructure(Recursive)/FolderStructure(Another Example)"
    )
);

const Pagination = React.lazy(() => import("../Projects/Pagination"));

export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  {
    routeName: "",
    component: <App />,
  },
  {
    routeName: "use-callback",
    component: <UseCallbackHook />,
  },
  {
    routeName: "nested-folder",
    component: <FolderComponent explorer={FolderData} />,
  },
  {
    routeName: "use-memo",
    component: <Factorial />,
  },
  {
    routeName: "use-memo2",
    component: <UseMemo2 />,
  },
  {
    routeName: "use-reducer",
    component: <StopWatch />,
  },
  {
    routeName: "photo-tagging",
    component: <Photo />,
  },
  {
    routeName: "context-api",
    component: <UseContext />,
  },
  {
    routeName: "store",
    component: <Dashboard />,
  },
  {
    routeName: "store/cart",
    component: <Cart />,
  },
  {
    routeName: "use-ref",
    component: <UseRef />,
  },
  {
    routeName: "custom-hooks",
    component: <Input />,
  },
  {
    routeName: "infinite-scroll",
    component: <InfiniteScrolls />,
  },
  {
    routeName: "rendering",
    component: <Parent />,
  },
  {
    routeName: "axios",
    component: <AxiosContainer />,
  },
  {
    routeName: "folder-structure-2",
    component: <FolderStructure />,
  },
  {
    routeName: "pagination",
    component: <Pagination />,
  },
];
