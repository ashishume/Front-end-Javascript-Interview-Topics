import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlices";

const reduxSliceStore = configureStore({
  reducer: combineReducers({
    cart,
  }),
});
export default reduxSliceStore;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxSliceStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxSliceStore.dispatch;
