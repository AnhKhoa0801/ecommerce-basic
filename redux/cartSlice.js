const { createSlice } = require("@reduxjs/toolkit");
import { v4 as uuidv4 } from "uuid";

const initialState = () => {
  if (typeof localStorage !== "undefined") {
    const cartInfo =
      localStorage.getItem("cartInfo") !== "undefined"
        ? JSON.parse(localStorage.getItem("cartInfo"))
        : localStorage.clear();

    if (cartInfo) {
      return cartInfo;
    }
  }

  return {
    userId: uuidv4(),
    cart: [],
  };
};

export const cartSlice = createSlice({
  name: "ShoppingCart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const idx = state.cart.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (idx > -1) {
        state.cart[idx].qty++;
      } else {
        const product = {
          product: action.payload.product,
          qty: action.payload.qty,
        };
        state.cart.push(product);
      }
    },

    removeToCart(state, action) {
      state.cart = state.cart.filter((item) => {
        return item.product.id !== action.payload.product.id;
      });
    },

    updateCartItem(state, action) {
      const idx = state.cart.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      state.cart[idx].qty = action.payload.qty;
    },
  },
});

// actions
export const cartActions = cartSlice.actions;

//selectors
export const cartSelector = (state) => state.cart;

//reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
