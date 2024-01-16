import { ReactElement } from "react";
import App from "../App";
import Photo from "../Projects/Tag/Photo";
import { FolderData } from "../Projects/FolderStructure(Recursive)/FolderData";
import Input from "../Projects/Hooks/CustomHooks/input";
import UseCallbackHook from "../Projects/Hooks/UseCallback/useCallback";
import UseContext from "../Projects/Hooks/UseContext";
import Factorial from "../Projects/Hooks/useMemo";
import UseMemo2 from "../Projects/Hooks/useMemo2";
import StopWatch from "../Projects/Hooks/useReducer";
import UseRef from "../Projects/Hooks/useRef";
import AxiosContainer from "../Projects/Axios";
import FolderComponent from "../Projects/FolderStructure(Recursive)/FolderComponent";
import InfiniteScrolls from "../Projects/Infinite-Scroll";
import Parent from "../Projects/Hooks/UseCallback(2nd example)/Parent";
import Dashboard from "../Projects/e-commerce/components/dashboard";
import Cart from "../Projects/e-commerce/containers/cart";
import FolderStructure from "../Projects/FolderStructure(Recursive)/FolderStructure(Another Example)";
import Pagination from "../Projects/Pagination";
import Welcome from "../Projects/Authentication/welcome";
import Login from "../Projects/Authentication";
import EMICalculator from "../Projects/EMI-Calculator";
import WhyDidYouUpdateCustomHook from "../Projects/useWhyDidYouUpdate-hook";
import UseCopyHook from "../Projects/useCopyHooks";
import InfiniteScroll from "../Projects/Infinite-Scroll/infinite.scroll-2";
import SlideShow from "../Projects/SlideShow";
import StopWatchComp from "../Projects/StopWatch";
import ParentForm from "../Projects/React-hook-form/ParentForm";
import LazyParentComp from "../Projects/CodeSplitting";
import ParentComponent from "../Projects/Hooks/ForwardRef/ParentComponent";
import Phone from "../Projects/OTP-login";
export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  {
    routeName: "/",
    component: <App />,
  },
  {
    routeName: "/welcome",
    component: <Welcome />,
  },
  {
    routeName: "/otp-login",
    component: <Phone />,
  },
  {
    routeName: "/forward-ref",
    component: <ParentComponent />,
  },
  {
    routeName: "/react-hook-form",
    component: <ParentForm />,
  },
  {
    routeName: "/login",
    component: <Login />,
  },
  {
    routeName: "/use-callback",
    component: <UseCallbackHook />,
  },
  {
    routeName: "/nested-folder",
    component: <FolderComponent explorer={FolderData} />,
  },
  {
    routeName: "/use-memo",
    component: <Factorial />,
  },
  {
    routeName: "/use-memo2",
    component: <UseMemo2 />,
  },
  {
    routeName: "/use-reducer",
    component: <StopWatch />,
  },
  {
    routeName: "/photo-tagging",
    component: <Photo />,
  },
  {
    routeName: "/context-api",
    component: <UseContext />,
  },
  {
    routeName: "/store",
    component: <Dashboard />,
  },
  {
    routeName: "/store/cart",
    component: <Cart />,
  },
  {
    routeName: "/use-ref",
    component: <UseRef />,
  },
  {
    routeName: "/custom-hooks",
    component: <Input />,
  },
  {
    routeName: "/infinite-scroll",
    component: <InfiniteScrolls />,
  },
  {
    routeName: "/infinite-scroll-2",
    component: <InfiniteScroll />,
  },
  {
    routeName: "/rendering",
    component: <Parent />,
  },
  {
    routeName: "/axios",
    component: <AxiosContainer />,
  },
  {
    routeName: "/folder-structure-2",
    component: <FolderStructure />,
  },
  {
    routeName: "/pagination",
    component: <Pagination />,
  },
  {
    routeName: "/emi-calculator",
    component: <EMICalculator />,
  },
  {
    routeName: "/why-did-you-update-custom-hook",
    component: <WhyDidYouUpdateCustomHook />,
  },
  {
    routeName: "/use-copy-custom-hook",
    component: <UseCopyHook />,
  },
  {
    routeName: "/slide-show",
    component: <SlideShow />,
  },
  {
    routeName: "/stop-watch",
    component: <StopWatchComp />,
  },
  {
    routeName: "code-splitting",
    component: <LazyParentComp />,
  },
];
