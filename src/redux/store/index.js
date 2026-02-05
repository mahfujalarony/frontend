import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./../cartSlice";
import authReducer from "../authSlice";



const loadCartFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};



export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState: {
    cart: {
      items: loadCartFromLocalStorage(),
    },
  },
});



store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem(
      "cartItems",
      JSON.stringify(state.cart.items)
    );
  } catch (err) {
    console.error("Failed to save cart", err);
  }
});



export const selectCartItems = (state) => state.cart.items;

export default store;
