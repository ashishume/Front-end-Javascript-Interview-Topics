// slices/exampleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ExampleState = {
  data: null,
  loading: false,
  error: null,
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } =
  exampleSlice.actions;

export default exampleSlice.reducer;
