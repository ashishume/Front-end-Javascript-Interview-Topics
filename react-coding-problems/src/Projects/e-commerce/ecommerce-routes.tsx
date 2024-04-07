import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Cart from "./containers/cart";
import { store } from "./store";
import { Provider } from "react-redux";

const EcommerceRoutes = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Provider>
  );
};

export default EcommerceRoutes;
