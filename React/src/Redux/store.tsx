import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "./reducer";
const store = configureStore({
  reducer: combineReducers({ cart }),
});

export default store;
