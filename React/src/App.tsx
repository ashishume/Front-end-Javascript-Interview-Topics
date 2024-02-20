import "./style.scss";
import { Link } from "react-router-dom";
import { routes } from "./Routes/routes";
import { Fragment } from "react";
const App = () => {
  return (
    <div className="container">
      <h1>Interview Concepts</h1>
      <div className="routing-container">
        {routes.map(({ routeName }) => {

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
