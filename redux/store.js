import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const rootReducers = {
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducers,
  devTools: true,
});

export default store;
