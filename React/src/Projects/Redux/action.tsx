import { Dispatch } from "@reduxjs/toolkit";
export const FETCH_FROM_CART = "FETCH_FROM_CART";
export const FETCH_FROM_CART_SUCESS = "FETCH_FROM_CART_SUCCESS";
export const FETCH_FROM_CART_ERROR = "FETCH_FROM_CART_ERROR";

interface ICart {
  type: typeof FETCH_FROM_CART;
  payload?: any;
}
interface ICartSucess {
  type: typeof FETCH_FROM_CART_SUCESS;
  payload?: any;
}
interface ICartFailure {
  type: typeof FETCH_FROM_CART_ERROR;
  payload?: any;
}

export type ICartDispatch = ICart | ICartSucess | ICartFailure;

export const fetchFromCart =
  () => async (dispatch: Dispatch<ICartDispatch>) => {
    dispatch({
      type: FETCH_FROM_CART,
    });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      const result = await response.json();
      if (result) {
        dispatch({
          type: FETCH_FROM_CART_SUCESS,
          payload: result,
        });
        // return result;
      }
    } catch (e) {
      dispatch({
        type: FETCH_FROM_CART_ERROR,
        payload: e,
      });
      // return e;
    }
  };
