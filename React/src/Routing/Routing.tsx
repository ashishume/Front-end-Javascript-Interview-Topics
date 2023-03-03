import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export default function Routing() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {routes.map(({ routeName, component }) => {
            return (
              <Route
                key={routeName}
                path={"/" + routeName}
                element={component}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
