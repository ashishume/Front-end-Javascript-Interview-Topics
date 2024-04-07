import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export default function Routing() {
  // const routesData = routes.map(({ routeName, component }) => {
  //   return {
  //     path: routeName,
  //     element: component,
  //     // loader: "",
  //     children: [],
  //   };
  // });

  // const router = createBrowserRouter(routesData as any);
  return (
    // <RouterProvider router={router}/>
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
