import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  isLoading: false,
  error: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    getUserOrder: (state, action) => {
      return action.payload;
    },

    getAlluserOrders: (state, action) => {
      return action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
