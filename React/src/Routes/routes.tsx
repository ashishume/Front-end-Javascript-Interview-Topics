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
import AxiosContainer from "../AbortController";
import FolderComponent from "../FolderStructure(Recursive)/FolderComponent";
import InfiniteScrolls from "../Infinite-Scroll-with-chat-bubble/infinite-with-intersection-observer";
import Parent from "../HOOKS(React)/UseCallback(2nd example)/Parent";
import FolderStructure from "../FolderStructure(Recursive)/FolderStructure(Another Example)";
import Pagination from "../Pagination";
import WhyDidYouUpdateCustomHook from "../HOOKS(React)/useWhyDidYouUpdate-hook";
import UseCopyHook from "../HOOKS(React)/useCopyHooks";
import InfiniteScroll from "../Infinite-Scroll-with-chat-bubble/infinite.scroll-2";
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
import RenderItemComponent from "../RenderItem";
import NestedCheckboxes from "../Nested-Checkboxes";
import MultiStepper from "../Multi-Stepper";
import TableWithNestedObjects from "../Table-nested-objects";
import ProgressBar from "../ProgressBar-with-Queue";
import DarkModeRoutes from "../DarkMode/dark-mode-routes";
import ThemeLayout from "../DarkMode/theme";
import EcommerceRoutes from "../e-commerce/ecommerce-routes";
import ImageModalParent from "../Image-Modal";
import Search from "../SearchWithDebounce";
import HomePageFeatureFlag from "../FeatureFlag/HomePage";
import FeatureFlag, { FeaturesFlagProvider } from "../FeatureFlag";
import RunningText from "../TypingEffectText";
import Tabs from "../Tabs";
import CommentsSection from "../CommentsSection(incomplete)";
import SwitchComponent from "../SwitchComponent";
import OptimiseMakingApiCalls from "../OptimiseMakingApiCalls";
import Walkthrough from "../WalkThrough";
import ResizeEvent from "../ResizeEvent";
import VerticalDivider from "../VerticalDivider";

export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  { routeName: "/", component: <App /> },
  { routeName: "/vertical-resizer", component: <VerticalDivider /> },
  { routeName: "/resize", component: <ResizeEvent /> },
  { routeName: "/optimise-api-calls", component: <OptimiseMakingApiCalls /> },
  { routeName: "/typing-effect-text", component: <RunningText /> },
  { routeName: "/switch-component", component: <SwitchComponent /> },
  { routeName: "/walkthrough", component: <Walkthrough /> },
  { routeName: "/tabs", component: <Tabs /> },
  {
    routeName: "/dark-mode/*",
    component: (
      <ThemeLayout>
        <DarkModeRoutes />
      </ThemeLayout>
    ),
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
  { routeName: "/ecommerce/*", component: <EcommerceRoutes /> },
  { routeName: "/use-ref", component: <UseRef /> },
  { routeName: "/custom-hooks", component: <Input /> },
  { routeName: "/infinite-scroll", component: <InfiniteScrolls /> },
  { routeName: "/infinite-scroll-2", component: <InfiniteScroll /> },
  { routeName: "/rendering", component: <Parent /> },
  { routeName: "/abort-controller", component: <AxiosContainer /> },
  { routeName: "/folder-structure-2", component: <FolderStructure /> },
  { routeName: "/pagination", component: <Pagination /> },
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
