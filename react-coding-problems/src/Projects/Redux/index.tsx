import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICartDispatch, fetchFromCart } from "./action";
import { Dispatch } from "@reduxjs/toolkit";
import { IInitialState } from "./reducer";

const ReduxIndex = () => {
  const dispatch = useDispatch<Dispatch<ICartDispatch>>();
  const { cart, isLoading } = useSelector(
    (state: IInitialState) => state?.cart
  );
  useEffect(() => {
    dispatch(fetchFromCart() as any);
  }, []);

  return (
    <div>
      <h1>Redux cart</h1>
      {isLoading && <div>loading...</div>}
      {!isLoading && (cart as any)?.title}
    </div>
  );
};

export default ReduxIndex;
