import { ReactElement } from "react";
import App from "../App";
import SelectableGrid from "../Projects/Selectable-Grid";
import GridLights from "@/Projects/Grid-lights";
import VerticalDivider from "@/Projects/VerticalDivider";
import Photo from "@/Projects/Tag";
import FeatureFlag from "@/Projects/FeatureFlag";
import HomePageFeatureFlag from "@/Projects/FeatureFlag/HomePage";
import ResizeEvent from "@/Projects/ResizeEvent-with-throttler";
import MakeApiCallsInChunk from "@/Projects/Make-API-calls-in-chunk";
import Tabs from "@/Projects/Tabs";
import TypewriterEffect from "@/Projects/TypingEffectText";
import SwitchComponent from "@/Projects/SwitchComponent";
import Walkthrough from "@/Projects/WalkThrough";
import Search from "@/Projects/SearchWithDebounce";
import ImageModalParent from "@/Projects/Image-Modal";
import ProgressBar from "@/Projects/ProgressBar-with-Queue";
import MultiStepper from "@/Projects/Multi-Stepper/multi-stepper";
import NestedCheckboxes from "@/Projects/Nested-Checkboxes";
import NestedCheckbox from "@/Projects/Checkbox-Nested";
import RenderItemComponent from "@/Projects/RenderItem";
import Languagei18next from "@/Projects/i18n-accessiblity";
import DynamicForm from "@/Projects/Dynamic-Input-Form";
import TableWithNestedObjects from "@/Projects/Table-nested-objects";
import ParentClassComponent from "@/Projects/React-Class-based-comp";
import TableSorting from "@/Projects/Table-with-sorting";
import DynamicFolder from "@/Projects/FolderStructure(Dynamic)/Parent";
import UseCallbackSecond from "@/Projects/HOOKS/UseCallback(2nd example)/Parent";
import { FolderData } from "@/Projects/FolderStructure(Recursive)/FolderData";
import FolderComponent from "@/Projects/FolderStructure(Recursive)/FolderComponent";
import FolderStructure2 from "@/Projects/FolderStructure(Recursive)/FolderStructure(Another Example)";
import SlideShow from "@/Projects/SlideShow";
import StopWatchComp from "@/Projects/StopWatch";
import InfiniteScroll from "@/Projects/Infinite-Scroll-with-chat-bubble/infinite.scroll-2";
import InfiniteScrolls from "@/Projects/Infinite-Scroll-with-chat-bubble/infinite-with-intersection-observer";
import AxiosContainer from "@/Projects/AbortController";
import ParentComponent from "@/Projects/HOOKS/ForwardRef/ParentComponent";
import UseCallbackHook from "@/Projects/HOOKS/UseCallback/useCallback";
import UseCallbackHook2 from "@/Projects/HOOKS/UseCallback(2nd example)/Parent";
import UseContext from "@/Projects/HOOKS/UseContext";
import UseLayoutEffectHook from "@/Projects/HOOKS/UseLayoutEffectHook";
import Input from "@/Projects/HOOKS/input";
import UseCopyHook from "@/Projects/HOOKS/useCopyHooks";
import ErrorBoundaryComponent from "@/Projects/HOOKS/useErrorBoundary/app";
import Factorial from "@/Projects/HOOKS/useMemo";
import UseMemo2 from "@/Projects/HOOKS/useMemo2";
import UseRef from "@/Projects/HOOKS/useRef";
import StopWatch from "@/Projects/StopWatch";
import WhyDidYouUpdateCustomHook from "@/Projects/HOOKS/useWhyDidYouUpdate-hook";
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
import CommentsSection from "@/Projects/CommentsSection";
import EcommerceRoutes from "@/Projects/e-commerce/ecommerce-routes";
import TrelloBoard from "@/Projects/Trello-Board";
import UseDeferredValueHook from "@/Projects/HOOKS/useDeferredValue-hook";
import ReactPortal from "@/Projects/React-Portals";
import SimpleProgressBarComp from "@/Projects/Progress-bar-with-css-(no queue)";
import ProgressBarWithQueue from "@/Projects/Progress-bar-with-queue-new-with-css";
import TransferList from "@/Projects/Transfer-List";
import Accordion from "@/Projects/Accordion";
import TrafficLights from "@/Projects/Traffic-Lights";
import StarRating from "@/Projects/Star-Rating";
import DelayApiCall from "@/Projects/Delay-API-call-using-use-throttler";
import AutoComplete from "@/Projects/AutoComplete-with-highlight";
import { MouseCapture } from "@/Projects/Mouse-Position-Capture-With-Click";
import BreadcrumbsComponent from "@/Projects/Breadcrumbs";
import TemperatureConvertor from "@/Projects/Temperature-Convertor";
import MemoryGame from "@/Projects/Memory-Game";
import UseAsyncApiCallSample from "@/Projects/HOOKS/useAsync";
import WhackAMole from "@/Projects/Whack-A-Mole";
import PollManager from "@/Projects/Poll-between-2-choices";
import LikeButton from "@/Projects/LikeButton";
import CanvasDrawing from "@/Projects/Canvas-Drawing";
import ProductListing from "@/Projects/Product-Listing-Page";
import MatchCountryCapitals from "@/Projects/Match-Country-Capitals-Game";
import SnackbarHome from "@/Projects/Snackbar";
import ExpenseGenerator from "@/Projects/ExpenseGenerator(incomplete)";
import StarRatingAdvanced from "@/Projects/Star-Rating-Content-stack-interview";
import UnControlledComp from "@/Projects/UncontrolledVsControlled";
import ZustandDemo from "../Projects/Zustand-demo";
import ReactQueryLibrary from "@/Projects/React-Query-Third-party-library";
import FindDomElementViaClick from "@/Projects/Find-DOM-Element-Via-Click";
import ExpenseSplitter from "@/Projects/ExpenseSplitter";
import GoogleDriveFileSystem from "@/Projects/GoogleDriveFileSystem";
// import ParentForm from "@/Projects/React-hook-form/ParentForm";
export const routes: {
  routeName: string;
  component: ReactElement;
}[] = [
  { routeName: "/", component: <App /> },
  {
    routeName: "/find-dom-el-via-click",
    component: <FindDomElementViaClick />,
  },
  { routeName: "/expense-generator", component: <ExpenseGenerator /> },
  { routeName: "/react-query", component: <ReactQueryLibrary /> },
  { routeName: "/expense-splitter", component: <ExpenseSplitter /> },
  { routeName: "/controlled-uncontrolled", component: <UnControlledComp /> },
  { routeName: "/snackbar", component: <SnackbarHome /> },
  { routeName: "/match-country-capitals", component: <MatchCountryCapitals /> },
  { routeName: "/product-listing", component: <ProductListing /> },
  { routeName: "/canvas-drawing", component: <CanvasDrawing /> },
  { routeName: "/like-button", component: <LikeButton /> },
  { routeName: "/google-drive", component: <GoogleDriveFileSystem /> },
  { routeName: "/polling-booth", component: <PollManager /> },
  { routeName: "/memory-game", component: <MemoryGame /> },
  { routeName: "/breadcrumbs", component: <BreadcrumbsComponent /> },
  { routeName: "/temperature-convertor", component: <TemperatureConvertor /> },
  { routeName: "/api-cancel-with-throttler", component: <DelayApiCall /> },
  { routeName: "/star-rating", component: <StarRating /> },
  { routeName: "/star-rating-advanced", component: <StarRatingAdvanced /> },
  { routeName: "/transfer-list", component: <TransferList /> },
  { routeName: "/traffic-light", component: <TrafficLights /> },
  { routeName: "/react-portal", component: <ReactPortal /> },
  { routeName: "/trello-board", component: <TrelloBoard /> },
  { routeName: "/selectable-grid", component: <SelectableGrid /> },
  { routeName: "/grid-light", component: <GridLights /> },
  { routeName: "/vertical-resizer", component: <VerticalDivider /> },
  { routeName: "/resize", component: <ResizeEvent /> },
  { routeName: "/make-api-calls-in-chunk", component: <MakeApiCallsInChunk /> },
  { routeName: "/typing-effect-text", component: <TypewriterEffect /> },
  { routeName: "/switch-component", component: <SwitchComponent /> },
  { routeName: "/walkthrough", component: <Walkthrough /> },
  { routeName: "/tabs", component: <Tabs /> },
  { routeName: "/accordion", component: <Accordion /> },
  { routeName: "/zustand-demo", component: <ZustandDemo /> },
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
  { routeName: "/whack-a-mole", component: <WhackAMole /> },
  { routeName: "/mouse-capture", component: <MouseCapture /> },
  { routeName: "/search", component: <Search /> },
  { routeName: "/auto-complete", component: <AutoComplete /> },
  { routeName: "/comments-section", component: <CommentsSection /> },
  { routeName: "/image-modal", component: <ImageModalParent /> },
  {
    routeName: "/progress-bar-with-queue-new",
    component: <ProgressBarWithQueue />,
  },
  { routeName: "/progress-bar-simple", component: <SimpleProgressBarComp /> },
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
  { routeName: "/use-callback-2", component: <UseCallbackHook2 /> },
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
  { routeName: "/use-async-hook", component: <UseAsyncApiCallSample /> },
  { routeName: "/use-deferred-value", component: <UseDeferredValueHook /> },
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
