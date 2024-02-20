import "./style.scss";
import { Link } from "react-router-dom";
import { routes } from "./Routes/routes";
import { Fragment, ReactElement, useState } from "react";
const App = () => {
  const [routeData, setRouteData] = useState(
    routes as { routeName: string; component: ReactElement }[]
  );

  function handleSearch(e: any) {
    const searchData = e.target.value;
    const res = routes.filter(
      (value: { routeName: string; component: ReactElement }) =>
        value.routeName.includes(searchData)
    );
    setRouteData(res);
  }

  return (
    <div className="container">
      <h1>Interview Concepts</h1>
      <input placeholder="search topics..." onChange={handleSearch} />
      <div className="routing-container">
        {routeData.map(({ routeName }) => {
          // remove nested routes
          routeName = routeName.includes("/*")
            ? routeName.replaceAll("/*", "/")
            : routeName;

          return (
            <Fragment key={routeName}>
              <Link key={routeName} className="link-routes" to={routeName}>
                {routeName}
              </Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default App;
