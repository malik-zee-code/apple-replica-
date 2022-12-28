import { createSlice } from "@reduxjs/toolkit";

const initialState = { QnA: [], isLoading: false, error: false };

const FaqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    fetchFaq: (state, action) => {
      return {
        QnA: action.payload.QnA,
        isLoading: action.payload.isLoading,
        error: action.payload.error,
      };
    },
    postFaq: (state, action) => {
      return {
        QnA: state.QnA,
        isLoading: action.payload.isLoading,
        error: action.payload.err,
      };
    },
  },
});

export const FaqActions = FaqSlice.actions;

export default FaqSlice.reducer;
