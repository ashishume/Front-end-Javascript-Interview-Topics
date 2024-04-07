import { ReactElement } from "react";
import App from "../App";
import SelectableGrid from "../Projects/Selectable-Grid";
import GridLights from "@/Projects/Grid-lights";
import VerticalDivider from "@/Projects/VerticalDivider";
import Photo from "@/Projects/Tag/Photo";
import FeatureFlag from "@/Projects/FeatureFlag";
import HomePageFeatureFlag from "@/Projects/FeatureFlag/HomePage";
import ResizeEvent from "@/Projects/ResizeEvent";
import OptimiseMakingApiCalls from "@/Projects/OptimiseMakingApiCalls";
import Tabs from "@/Projects/Tabs";
import TypewriterEffect from "@/Projects/TypingEffectText";
import SwitchComponent from "@/Projects/SwitchComponent";
import Walkthrough from "@/Projects/WalkThrough";
import Search from "@/Projects/SearchWithDebounce";
import ImageModalParent from "@/Projects/Image-Modal";
import ProgressBar from "@/Projects/ProgressBar-with-Queue";
import MultiStepper from "@/Projects/Multi-Stepper";
import NestedCheckboxes from "@/Projects/Nested-Checkboxes";
import NestedCheckbox from "@/Projects/Checkbox-Nested";
import RenderItemComponent from "@/Projects/RenderItem";
import Languagei18next from "@/Projects/i18n-accessiblity";
import DynamicForm from "@/Projects/Dynamic-Input-Form";
import TableWithNestedObjects from "@/Projects/Table-nested-objects";
import ParentClassComponent from "@/Projects/React-Class-based-comp";
import TableSorting from "@/Projects/Table-with-sorting";
import DynamicFolder from "@/Projects/FolderStructure(Dynamic)/Parent";
import UseCallbackSecond from "@/Projects/HOOKS(React)/UseCallback(2nd example)/Parent";
import { FolderData } from "@/Projects/FolderStructure(Recursive)/FolderData";
import FolderComponent from "@/Projects/FolderStructure(Recursive)/FolderComponent";
import FolderStructure2 from "@/Projects/FolderStructure(Recursive)/FolderStructure(Another Example)";
import SlideShow from "@/Projects/SlideShow";
import StopWatchComp from "@/Projects/StopWatch";
import InfiniteScroll from "@/Projects/Infinite-Scroll-with-chat-bubble/infinite.scroll-2";
import InfiniteScrolls from "@/Projects/Infinite-Scroll-with-chat-bubble/infinite-with-intersection-observer";
import AxiosContainer from "@/Projects/AbortController";
import ParentComponent from "@/Projects/HOOKS(React)/ForwardRef/ParentComponent";
import UseCallbackHook from "@/Projects/HOOKS(React)/UseCallback/useCallback";
import UseContext from "@/Projects/HOOKS(React)/UseContext";
import UseLayoutEffectHook from "@/Projects/HOOKS(React)/UseLayoutEffectHook";
import Input from "@/Projects/HOOKS(React)/input";
import UseCopyHook from "@/Projects/HOOKS(React)/useCopyHooks";
import ErrorBoundaryComponent from "@/Projects/HOOKS(React)/useErrorBoundary";
import Factorial from "@/Projects/HOOKS(React)/useMemo";
import UseMemo2 from "@/Projects/HOOKS(React)/useMemo2";
import UseRef from "@/Projects/HOOKS(React)/useRef";
import StopWatch from "@/Projects/StopWatch";
import WhyDidYouUpdateCustomHook from "@/Projects/HOOKS(React)/useWhyDidYouUpdate-hook";
import PureClassBasedComponent from "@/Projects/Pure-Components";
import Phone from "@/Projects/OTP-login";
import Pagination from "@/Projects/Pagination";
import LazyParentComp from "@/Projects/CodeSplitting";
import SSRPagination from "@/Projects/Table-Pagination-SSR";
import ThemeLayout from "@/Projects/DarkMode/theme";
import DarkModeRoutes from "@/Projects/DarkMode/dark-mode-routes";
import { Provider } from "react-redux";
import ReduxIndex from "@/Projects/Redux";
import store from "@/Projects/Redux/store";
import ReduxSliceIndex from "@/Projects/Redux-Slices";
import reduxSliceStore from "@/Projects/Redux-Slices/store";
import CommentsSection from "@/Projects/CommentsSection(incomplete)";
import EcommerceRoutes from "@/Projects/e-commerce/ecommerce-routes";
// import ParentForm from "@/Projects/React-hook-form/ParentForm";
export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  { routeName: "/", component: <App /> },
  { routeName: "/selectable-grid", component: <SelectableGrid /> },
  { routeName: "/grid-light", component: <GridLights /> },
  { routeName: "/vertical-resizer", component: <VerticalDivider /> },
  { routeName: "/resize", component: <ResizeEvent /> },
  { routeName: "/optimise-api-calls", component: <OptimiseMakingApiCalls /> },
  { routeName: "/typing-effect-text", component: <TypewriterEffect /> },
  { routeName: "/switch-component", component: <SwitchComponent /> },
  { routeName: "/walkthrough", component: <Walkthrough /> },
  { routeName: "/tabs", component: <Tabs /> },
  {
    routeName: "/dark-mode/*",
    component: (
      <ThemeLayout>
        <DarkModeRoutes />
      </ThemeLayout>
    ), //not working
  },
  {
    routeName: "/feature-flag",
    component: (
      <FeatureFlag>
        <HomePageFeatureFlag />
      </FeatureFlag>
    ),
  },
  { routeName: "/search", component: <Search /> },
  { routeName: "/comments-section", component: <CommentsSection /> },
  { routeName: "/image-modal", component: <ImageModalParent /> },
  { routeName: "/progress-bar-dynamic", component: <ProgressBar /> },
  { routeName: "/stepper", component: <MultiStepper /> },
  { routeName: "/nested-checkboxes", component: <NestedCheckboxes /> },
  { routeName: "/nested-checkbox", component: <NestedCheckbox /> },
  { routeName: "/render-item", component: <RenderItemComponent /> },
  { routeName: "/i18next", component: <Languagei18next /> },
  { routeName: "/dynamic-form", component: <DynamicForm /> },
  { routeName: "/table-nested-object", component: <TableWithNestedObjects /> },
  { routeName: "/table-ssr-pagination", component: <SSRPagination /> },
  { routeName: "/table-with-sorting", component: <TableSorting /> },
  {
    routeName: "/redux",
    component: (
      <Provider store={store}>
        <ReduxIndex />
      </Provider>
    ),
  },
  //NOTE: both store cannot function at the same time, comment one of them to get other one to be working
  {
    routeName: "/redux-slice",
    component: (
      <Provider store={reduxSliceStore}>
        <ReduxSliceIndex />
      </Provider>
    ),
  },
  { routeName: "/react-class", component: <ParentClassComponent /> },
  { routeName: "/dynamic-folder", component: <DynamicFolder /> },
  { routeName: "/pure-component", component: <PureClassBasedComponent /> },
  { routeName: "/otp-login", component: <Phone /> },
  { routeName: "/error-boundary-hook", component: <ErrorBoundaryComponent /> },
  { routeName: "/forward-ref", component: <ParentComponent /> },
  // { routeName: "/react-hook-form", component: <ParentForm /> },  // NOTE: not working (reason: bootstrap form)
  { routeName: "/use-callback", component: <UseCallbackHook /> },
  {
    routeName: "/nested-folder",
    component: <FolderComponent explorer={FolderData} />,
  },
  { routeName: "/use-memo", component: <Factorial /> },
  { routeName: "/use-memo2", component: <UseMemo2 /> },
  { routeName: "/use-reducer", component: <StopWatch /> },
  { routeName: "/photo-tagging", component: <Photo /> }, //=====> not working properly
  { routeName: "/context-api", component: <UseContext /> },
  { routeName: "/ecommerce/*", component: <EcommerceRoutes /> },
  { routeName: "/use-ref", component: <UseRef /> },
  { routeName: "/custom-hooks", component: <Input /> },
  { routeName: "/infinite-scroll", component: <InfiniteScrolls /> },
  { routeName: "/infinite-scroll-2", component: <InfiniteScroll /> },
  { routeName: "/rendering", component: <UseCallbackSecond /> },
  { routeName: "/abort-controller", component: <AxiosContainer /> },
  { routeName: "/folder-structure-2", component: <FolderStructure2 /> },
  { routeName: "/pagination", component: <Pagination /> },
  {
    routeName: "/why-did-you-update-custom-hook",
    component: <WhyDidYouUpdateCustomHook />,
  },
  { routeName: "/use-copy-custom-hook", component: <UseCopyHook /> },
  { routeName: "/slide-show", component: <SlideShow /> },
  { routeName: "/stop-watch", component: <StopWatchComp /> },
  { routeName: "/code-splitting", component: <LazyParentComp /> },
  { routeName: "/use-layout-effect", component: <UseLayoutEffectHook /> },
];
