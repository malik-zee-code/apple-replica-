import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  error: false,
  filteredProducts: [],
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      return action.payload;
    },
    filterProducts: (state, action) => {
      return { ...state, filteredProducts: action.payload };
    },
  },
});

export const ProductActions = ProductSlice.actions;

export default ProductSlice.reducer;
