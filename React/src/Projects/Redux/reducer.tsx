import { produce } from "immer";
import {
  FETCH_FROM_CART,
  FETCH_FROM_CART_ERROR,
  FETCH_FROM_CART_SUCESS,
} from "./action";

export interface IInitialState {
  cart: ICartState;
}

export interface ICartState {
  cart: any;
  isLoading: boolean;
  error: any;
}
const initialState: ICartState = {
  cart: null,
  isLoading: false,
  error: null,
};
const cartReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case FETCH_FROM_CART:
      return produce(state, (draft) => {
        draft.isLoading = true;
        draft.error = {};
      });
    case FETCH_FROM_CART_SUCESS:
      return produce(state, (draft) => {
        draft.cart = action.payload;
        draft.isLoading = false;
      });
    case FETCH_FROM_CART_ERROR:
      return produce(state, (draft) => {
        draft.isLoading = false;
        draft.error = "error message";
      });

    //another way to update state
    // return {
    //   ...state,
    //   cart: action.payload,
    // };
    default:
      return state;
  }
};

export default cartReducer;
