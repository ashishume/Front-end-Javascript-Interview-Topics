import { generalRoutes } from "./general.routes";
import { hooksRoutes } from "./hooks.routes";
import { stateRoutes } from "./state.routes";

export type { AppRoute } from "./route.types";

export const routes = [...generalRoutes, ...hooksRoutes, ...stateRoutes];
