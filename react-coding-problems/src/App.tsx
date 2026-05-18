import { Link } from "react-router-dom";
import { AppRoute, routes } from "./Routes/routes";
import { useDeferredValue, useMemo, useRef, useState } from "react";
const App = () => {
  const [searchText, setSearchText] = useState("");
  const deferredSearchText = useDeferredValue(searchText);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const routeData = useMemo(() => {
    return routes
      .map((route: AppRoute) => ({
        ...route,
        displayRouteName: route.routeName.includes("/*")
          ? route.routeName.replace(/\/\*/g, "/")
          : route.routeName,
        displayTopicName:
          route.routeName === "/" ? "home" : route.routeName.split("/")[1],
        searchText: `${route.routeName} ${route.sourceFile}`.toLowerCase(),
      }))
      .sort((a, b) => a.displayRouteName.localeCompare(b.displayRouteName));
  }, []);

  const filteredRoutes = useMemo(() => {
    const normalizedSearchText = deferredSearchText.trim().toLowerCase();
    if (!normalizedSearchText) return routeData;

    return routeData.filter((route) =>
      route.searchText.includes(normalizedSearchText)
    );
  }, [deferredSearchText, routeData]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <div className="container rounded-xl border-slate-800 mb-5 py-5">
      <h1 className="text-3xl py-3">React Interview Concepts</h1>
      <input
        className="w-full mb-3 px-1"
        placeholder="search topics or source file..."
        ref={inputRef}
        value={searchText}
        onChange={handleSearch}
        autoFocus
      />
      <div className="flex flex-col gap-1">
        {filteredRoutes.map((route) => {
          return (
            <Link
              key={route.routeName}
              className="bg-slate-400 text-black p-2 hover:bg-slate-700 hover:text-white"
              to={route.displayRouteName}
            >
              <div className="font-medium">{route.displayTopicName}</div>
              <div className="text-xs opacity-80">{route.sourceFile}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default App;
