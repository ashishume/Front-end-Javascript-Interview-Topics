import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: any = {
  cartData: null,
  isLoading: false,
};
export const fetchCart = createAsyncThunk("products/fetchCart", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  return await response.json();
});

/** accepts an object of reducer functions, a slice name, and an initial
 * state value, and automatically generates a slice reducer with
 * corresponding action creators and action types */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCart
    builder.addCase(
      fetchCart.pending,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchCart.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.cartData = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchCart.rejected,
      (state: any, action: PayloadAction<any>) => {
        state.cartData = [];
        state.isLoading = false;
      }
    );
  },
});
// export const { removeProduct, updateProductQuantity, calculateTotalPrice } =
//   cartSlice.actions;

export const selectCart = (state: any) => state.cart;
export default cartSlice.reducer;
