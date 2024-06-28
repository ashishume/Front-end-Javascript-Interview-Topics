import { useNavigate } from "react-router-dom";

const BreadcrumbsComponent = () => {
  const routes = [
    { label: "Home", route: "/" },
    { label: "Category", route: "/category" },
    { label: "Sub Category", route: "/category/sub-category" },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center gap-1">
        {routes.map(({ label, route }, index) => {
          return (
            <div className="bold" key={label} onClick={() => navigate(route)}>
              <span className="font-bold hover:underline underline-offset-4 cursor-pointer	">
                {label}
              </span>
              <span>{index < routes.length - 1 ? ` / ` : ""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BreadcrumbsComponent;
