import { ReactElement } from "react";
import App from "../App";
import Photo from "../Projects/Tag/Photo";
import { FolderData } from "../Projects/FolderStructure(Recursive)/FolderData";
import Input from "../Projects/hooks/customHooks/input";
import UseCallbackHook from "../Projects/hooks/UseCallback/useCallback";
import UseContext from "../Projects/hooks/UseContext";
import Factorial from "../Projects/hooks/useMemo";
import UseMemo2 from "../Projects/hooks/useMemo2";
import StopWatch from "../Projects/hooks/useReducer";
import UseRef from "../Projects/hooks/useRef";
import AxiosContainer from "../Projects/Axios";
import FolderComponent from "../Projects/FolderStructure(Recursive)/FolderComponent";
import InfiniteScrolls from "../Projects/Infinite-Scroll";
import Parent from "../Projects/hooks/UseCallback(2nd example)/Parent";
import Dashboard from "../Projects/e-commerce/components/dashboard";
import Cart from "../Projects/e-commerce/containers/cart";
import FolderStructure from "../Projects/FolderStructure(Recursive)/FolderStructure(Another Example)";
import Pagination from "../Projects/Pagination";
import Welcome from "../Projects/Authentication/welcome";
import Login from "../Projects/Authentication";
import EMICalculator from "../Projects/EMI-Calculator";
export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  {
    routeName: "",
    component: <App />,
  },
  {
    routeName: "welcome",
    component: <Welcome />,
  },
  {
    routeName: "login",
    component: <Login />,
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
  {
    routeName: "emi-calculator",
    component: <EMICalculator />,
  },
];