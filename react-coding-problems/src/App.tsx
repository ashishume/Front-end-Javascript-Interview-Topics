import { Link } from "react-router-dom";
import { routes } from "./Routes/routes";
import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
const App = () => {
  const [routeData, setRouteData] = useState(
    [] as { routeName: string; component: ReactElement }[]
  );

  const inputRef = useRef(null as any);

  function handleSearch(e: any) {
    const searchData = e.target.value;
    const res = routes.filter(
      (value: { routeName: string; component: ReactElement }) =>
        value.routeName.includes(searchData)
    );
    setRouteData(res);
  }

  useEffect(() => {
    const sortedData = routes.sort((a, b) =>
      a.routeName.localeCompare(b.routeName)
    );
    setRouteData(sortedData);
    inputRef?.current?.focus();
  }, []);

  return (
    <div className="container rounded-xl border-slate-800 mb-5 py-5">
      <h1 className="text-3xl py-3">React Interview Concepts</h1>
      <input
        className="w-full mb-3 px-1"
        placeholder="search topics..."
        ref={inputRef}
        onChange={handleSearch}
      />
      <div className="flex flex-col">
        {routeData.map(({ routeName }) => {
          // remove nested routes
          routeName = routeName.includes("/*")
            ? (routeName as any).replaceAll("/*", "/")
            : routeName;

          return (
            <Fragment key={routeName}>
              <Link
                key={routeName}
                className="bg-slate-400 text-black p-1 hover:bg-slate-700 hover:text-white pl-4"
                to={routeName}
              >
                {routeName.split("/")[1]}
              </Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default App;
