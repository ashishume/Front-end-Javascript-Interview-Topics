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
import WhyDidYouUpdateCustomHook from "@/Projects/HOOKS/useWhyDidYouUpdate-hook";
import UseDeferredValueHook from "@/Projects/HOOKS/useDeferredValue-hook";
import UseAsyncApiCallSample from "@/Projects/HOOKS/useAsync";
import UseCallbackSecond from "@/Projects/HOOKS/UseCallback(2nd example)/Parent";
import StopWatch from "@/Projects/StopWatch";
import { AppRoute } from "./route.types";

const sourceFile = "hooks.routes.tsx";

export const hooksRoutes: AppRoute[] = [
  { routeName: "/error-boundary-hook", component: <ErrorBoundaryComponent />, sourceFile },
  { routeName: "/forward-ref", component: <ParentComponent />, sourceFile },
  { routeName: "/use-callback", component: <UseCallbackHook />, sourceFile },
  { routeName: "/use-callback-2", component: <UseCallbackHook2 />, sourceFile },
  { routeName: "/use-memo", component: <Factorial />, sourceFile },
  { routeName: "/use-memo2", component: <UseMemo2 />, sourceFile },
  { routeName: "/use-reducer", component: <StopWatch />, sourceFile },
  { routeName: "/context-api", component: <UseContext />, sourceFile },
  { routeName: "/use-ref", component: <UseRef />, sourceFile },
  { routeName: "/custom-hooks", component: <Input />, sourceFile },
  { routeName: "/use-async-hook", component: <UseAsyncApiCallSample />, sourceFile },
  { routeName: "/use-deferred-value", component: <UseDeferredValueHook />, sourceFile },
  { routeName: "/rendering", component: <UseCallbackSecond />, sourceFile },
  { routeName: "/why-did-you-update-custom-hook", component: <WhyDidYouUpdateCustomHook />, sourceFile },
  { routeName: "/use-copy-custom-hook", component: <UseCopyHook />, sourceFile },
  { routeName: "/use-layout-effect", component: <UseLayoutEffectHook />, sourceFile },
];
