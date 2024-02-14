import { ReactElement } from "react";
import App from "../App";
import Photo from "../Tag/Photo";
import { FolderData } from "../FolderStructure(Recursive)/FolderData";
import Input from "../HOOKS(React)/input";
import UseCallbackHook from "../HOOKS(React)/UseCallback/useCallback";
import UseContext from "../HOOKS(React)/UseContext";
import Factorial from "../HOOKS(React)/useMemo";
import UseMemo2 from "../HOOKS(React)/useMemo2";
import StopWatch from "../HOOKS(React)/useReducer";
import UseRef from "../HOOKS(React)/useRef";
import AxiosContainer from "../Axios";
import FolderComponent from "../FolderStructure(Recursive)/FolderComponent";
import InfiniteScrolls from "../Infinite-Scroll";
import Parent from "../HOOKS(React)/UseCallback(2nd example)/Parent";
import Dashboard from "../e-commerce/components/dashboard";
import Cart from "../e-commerce/containers/cart";
import FolderStructure from "../FolderStructure(Recursive)/FolderStructure(Another Example)";
import Pagination from "../Pagination";
import Welcome from "../Authentication/welcome";
import Login from "../Authentication";
import EMICalculator from "../EMI-Calculator";
import WhyDidYouUpdateCustomHook from "../HOOKS(React)/useWhyDidYouUpdate-hook";
import UseCopyHook from "../HOOKS(React)/useCopyHooks";
import InfiniteScroll from "../Infinite-Scroll/infinite.scroll-2";
import SlideShow from "../SlideShow";
import StopWatchComp from "../StopWatch";
import ParentForm from "../React-hook-form/ParentForm";
import LazyParentComp from "../CodeSplitting";
import ParentComponent from "../HOOKS(React)/ForwardRef/ParentComponent";
import Phone from "../OTP-login";
import SSRPagination from "../Table-Pagination-SSR";
import ReduxIndex from "../Redux";
import { Provider } from "react-redux";
import reduxStore from "../Redux/store";
import reduxSliceStore from "../Redux-Slices/store";
import ReduxSliceIndex from "../Redux-Slices";
import Languagei18next from "../i18n-accessiblity";
import TableSorting from "../Table-with-sorting";
import ErrorBoundaryComponent from "../HOOKS(React)/useErrorBoundary";
import ParentClassComponent from "../React-Class-based-comp";
import PureClassBasedComponent from "../Pure-Components";
import DyamicFolder from "../FolderStructure(Dynamic)/Parent";
import UseLayoutEffectHook from "../HOOKS(React)/UseLayoutEffectHook";
import NestedCheckbox from "../Checkbox-Nested";
import DynamicForm from "../Dynamic-Input-Form";
import CalenderMeetings from "../Calender-Meetings(incomplete)";
import RenderItemComponent from "../RenderItem";
import NestedCheckboxes from "../Nested-Checkboxes";
import MultiStepper from "../Multi-Stepper";
import TableWithNestedObjects from "../Table-nested-objects";


export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  { routeName: "/", component: <App /> },
  { routeName: "/welcome", component: <Welcome /> },
  { routeName: "/stepper", component: <MultiStepper /> },
  { routeName: "/nested-checkboxes", component: <NestedCheckboxes /> },
  { routeName: "/calender", component: <CalenderMeetings /> },
  { routeName: "/render-item", component: <RenderItemComponent /> },
  { routeName: "/i18next", component: <Languagei18next /> },
  { routeName: "/dynamic-form", component: <DynamicForm /> },
  { routeName: "/table-nested-object", component: <TableWithNestedObjects /> },
  { routeName: "/table-ssr-pagination", component: <SSRPagination /> },
  { routeName: "/table-with-sorting", component: <TableSorting /> },
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
  { routeName: "/nested-checkbox", component: <NestedCheckbox /> },
  { routeName: "/react-class", component: <ParentClassComponent /> },
  { routeName: "/dynamic-folder", component: <DyamicFolder /> },
  { routeName: "/pure-component", component: <PureClassBasedComponent /> },
  { routeName: "/otp-login", component: <Phone /> },
  { routeName: "/error-boundary-hook", component: <ErrorBoundaryComponent /> },
  { routeName: "/forward-ref", component: <ParentComponent /> },
  { routeName: "/react-hook-form", component: <ParentForm /> },
  { routeName: "/login", component: <Login /> },
  { routeName: "/use-callback", component: <UseCallbackHook /> },
  {
    routeName: "/nested-folder",
    component: <FolderComponent explorer={FolderData} />,
  },
  { routeName: "/use-memo", component: <Factorial /> },
  { routeName: "/use-memo2", component: <UseMemo2 /> },
  { routeName: "/use-reducer", component: <StopWatch /> },
  { routeName: "/photo-tagging", component: <Photo /> },
  { routeName: "/context-api", component: <UseContext /> },
  { routeName: "/store", component: <Dashboard /> },
  { routeName: "/store/cart", component: <Cart /> },
  { routeName: "/use-ref", component: <UseRef /> },
  { routeName: "/custom-hooks", component: <Input /> },
  { routeName: "/infinite-scroll", component: <InfiniteScrolls /> },
  { routeName: "/infinite-scroll-2", component: <InfiniteScroll /> },
  { routeName: "/rendering", component: <Parent /> },
  { routeName: "/axios", component: <AxiosContainer /> },
  { routeName: "/folder-structure-2", component: <FolderStructure /> },
  { routeName: "/pagination", component: <Pagination /> },
  { routeName: "/emi-calculator", component: <EMICalculator /> },
  {
    routeName: "/why-did-you-update-custom-hook",
    component: <WhyDidYouUpdateCustomHook />,
  },
  { routeName: "/use-copy-custom-hook", component: <UseCopyHook /> },
  { routeName: "/slide-show", component: <SlideShow /> },
  { routeName: "/stop-watch", component: <StopWatchComp /> },
  { routeName: "code-splitting", component: <LazyParentComp /> },
  { routeName: "use-layout-effect", component: <UseLayoutEffectHook /> },
];
