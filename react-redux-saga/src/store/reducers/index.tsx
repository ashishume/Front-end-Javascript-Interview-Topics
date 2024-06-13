// reducers/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import exampleReducer from "../slices/exampleSlice";

const rootReducer = combineReducers({
  example: exampleReducer,
});

export default rootReducer;
