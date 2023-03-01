import "./style.scss";
import { Link } from "react-router-dom";
import { routes } from "./Routing/routes";
const App = () => {
  return (
    <div className="container">
      <h1>Interview Concepts</h1>
      <div className="routing-container">
        {routes.map(({ routeName }) => (
          <Link key={routeName} className="link-routes" to={routeName}>
            {routeName}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default App;
