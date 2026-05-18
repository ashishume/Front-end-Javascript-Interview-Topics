import { ReactElement } from "react";

export type AppRoute = {
  routeName: string;
  component: ReactElement;
  sourceFile: string;
};
