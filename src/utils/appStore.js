import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer
  },
  // Enable Redux DevTools
  devTools: process.env.NODE_ENV !== "production"
});

export default appStore;
