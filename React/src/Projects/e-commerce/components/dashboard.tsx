import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/asyncActions";
import Product from "./product";
import * as ActionTypes from "../store/actions/actions";
import { Link } from "react-router-dom";

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  isAdded?: boolean;
  index?: number;
  quantity: number;
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.cart.cart);
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, []);

  const addToCart = (index: number) => {
    dispatch({ type: ActionTypes.ADD_TO_CART, payload: index });
  };
  const removeFromCart = (index: number) => {
    dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: index });
  };
  const onQuantityChange = (isIncremented: boolean, index: number) => {
    dispatch({
      type: isIncremented
        ? ActionTypes.INCREASE_QUANTITY
        : ActionTypes.DECREASE_QUANTITY,
      payload: index,
    });
  };
  return (
    <div>
      <Link to="/store/cart">Go to Cart</Link>
      <br />
      <br />
      {products.map((value: Product, index: number) => {
        const { id, title, description, price, images } = value;
        let isAdded = false;
        let quantity = 1;
        if (!!value?.isAdded) {
          isAdded = true;
        }
        if (!!value.quantity) quantity = value.quantity;
        return (
          <Product
            key={id}
            title={title}
            description={description}
            price={price}
            image={images[0]}
            addToCart={() => addToCart(index)}
            removeFromCart={() => removeFromCart(index)}
            isAdded={isAdded}
            onQuantityChange={(e: boolean) => onQuantityChange(e, index)}
            quantity={quantity}
          />
        );
      })}
    </div>
  );
};

export default Dashboard;
