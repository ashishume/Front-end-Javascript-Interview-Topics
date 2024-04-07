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
  // { routeName: "/typing-effect-text", component: <RunningText /> },
  // { routeName: "/switch-component", component: <SwitchComponent /> },
  // { routeName: "/walkthrough", component: <Walkthrough /> },
  { routeName: "/tabs", component: <Tabs /> },
  // {
  //   routeName: "/dark-mode/*",
  //   component: (
  //     <ThemeLayout>
  //       <DarkModeRoutes />
  //     </ThemeLayout>
  //   ),
  // },
  {
    routeName: "/feature-flag",
    component: (
      <FeatureFlag>
        <HomePageFeatureFlag />
      </FeatureFlag>
    ),
  },
  // { routeName: "/search", component: <Search /> },
  // { routeName: "/comments-section", component: <CommentsSection /> },
  // { routeName: "/image-modal", component: <ImageModalParent /> },
  // { routeName: "/progress-bar-dynamic", component: <ProgressBar /> },
  // { routeName: "/stepper", component: <MultiStepper /> },
  // { routeName: "/nested-checkboxes", component: <NestedCheckboxes /> },
  // { routeName: "/render-item", component: <RenderItemComponent /> },
  // { routeName: "/i18next", component: <Languagei18next /> },
  // { routeName: "/dynamic-form", component: <DynamicForm /> },
  // { routeName: "/table-nested-object", component: <TableWithNestedObjects /> },
  // { routeName: "/table-ssr-pagination", component: <SSRPagination /> },
  // { routeName: "/table-with-sorting", component: <TableSorting /> },
  // {
  //   routeName: "/redux",
  //   component: (
  //     <Provider store={reduxStore}>
  //       <ReduxIndex />
  //     </Provider>
  //   ),
  // },
  // {
  //   routeName: "/redux-slice",
  //   component: (
  //     <Provider store={reduxSliceStore}>
  //       <ReduxSliceIndex />
  //     </Provider>
  //   ),
  // },
  // { routeName: "/nested-checkbox", component: <NestedCheckbox /> },
  // { routeName: "/react-class", component: <ParentClassComponent /> },
  // { routeName: "/dynamic-folder", component: <DyamicFolder /> },
  // { routeName: "/pure-component", component: <PureClassBasedComponent /> },
  // { routeName: "/otp-login", component: <Phone /> },
  // { routeName: "/error-boundary-hook", component: <ErrorBoundaryComponent /> },
  // { routeName: "/forward-ref", component: <ParentComponent /> },
  // { routeName: "/react-hook-form", component: <ParentForm /> },
  // { routeName: "/use-callback", component: <UseCallbackHook /> },
  // {
  //   routeName: "/nested-folder",
  //   component: <FolderComponent explorer={FolderData} />,
  // },
  // { routeName: "/use-memo", component: <Factorial /> },
  // { routeName: "/use-memo2", component: <UseMemo2 /> },
  // { routeName: "/use-reducer", component: <StopWatch /> },
  { routeName: "/photo-tagging", component: <Photo /> },  //=====> not working properly
  // { routeName: "/context-api", component: <UseContext /> },
  // { routeName: "/ecommerce/*", component: <EcommerceRoutes /> },
  // { routeName: "/use-ref", component: <UseRef /> },
  // { routeName: "/custom-hooks", component: <Input /> },
  // { routeName: "/infinite-scroll", component: <InfiniteScrolls /> },
  // { routeName: "/infinite-scroll-2", component: <InfiniteScroll /> },
  // { routeName: "/rendering", component: <Parent /> },
  // { routeName: "/abort-controller", component: <AxiosContainer /> },
  // { routeName: "/folder-structure-2", component: <FolderStructure /> },
  // { routeName: "/pagination", component: <Pagination /> },
  // {
  //   routeName: "/why-did-you-update-custom-hook",
  //   component: <WhyDidYouUpdateCustomHook />,
  // },
  // { routeName: "/use-copy-custom-hook", component: <UseCopyHook /> },
  // { routeName: "/slide-show", component: <SlideShow /> },
  // { routeName: "/stop-watch", component: <StopWatchComp /> },
  // { routeName: "code-splitting", component: <LazyParentComp /> },
  // { routeName: "use-layout-effect", component: <UseLayoutEffectHook /> },
];
