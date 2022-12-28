import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  userData: {},
  token: "",
  error: false,
  backgroundImages: [],
  logo: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        isLoggedin: action.payload.isLoggedin,
        userData: action.payload.userData,
        backgroundImages: state.backgroundImages,
        token: action.payload.token,
        error: action.payload.error,
      };
    },
    registerUser: (state, action) => {
      return {
        isLoggedin: action.payload.isLoggedin,
        userData: action.payload.userData,
        backgroundImages: state.backgroundImages,

        token: action.payload.token,
        error: action.payload.error,
      };
    },
    fetchUser: (state, action) => {
      return {
        isLoggedin: action.payload.isLoggedin,
        userData: action.payload.userData,
        backgroundImages: state.backgroundImages,
        token: action.payload.token,
        error: action.payload.error,
      };
    },

    fetchImages: (state, action) => {
      return {
        ...state,
        backgroundImages: action.payload,
      };
    },
    fetchLogo: (state, action) => {
      return {
        ...state,
        logo: action.payload,
      };
    },
  },
});

export const UserActions = UserSlice.actions;

export default UserSlice.reducer;
