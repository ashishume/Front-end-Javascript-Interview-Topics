import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Product } from "../components/dashboard";

const Cart = () => {
  const products = useSelector(
    (state: { cart: { cart: Product[] } }) => state.cart.cart
  );
  const [addedToCartItems, addToCart] = useState([] as Product[]);
  useEffect(() => {
    const addedToCart = products.filter((value: Product) => value.isAdded);
    console.log(addedToCart);
    addToCart(addedToCart);
  }, []);
  return (
    <>
      <div className="cart-container">
        <Link to="/store">back to dashboard</Link>
        <br />
        {addedToCartItems.map((value: Product) => {
          return (
            <Fragment key={value.id}>
              <br />
              <br />
              <div>
                Title: {value.title}
                <br />
                <span>Quantity:{value.quantity}</span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
