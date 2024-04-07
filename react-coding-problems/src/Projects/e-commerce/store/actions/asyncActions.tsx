import React from "react";
import axios from "axios";
import * as ActionTypes from "../actions/actions";
export const fetchProducts = () => {
  return (dispatch: any) => {
    axios
      .get("https://api.escuelajs.co/api/v1/products?offset=0&limit=10")
      .then((data) => {
        dispatch({
          payload: data.data,
          type: ActionTypes.FETCH_PRODUCTS,
        });
      });
  };
};
