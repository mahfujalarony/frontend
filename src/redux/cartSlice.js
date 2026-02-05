import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { id, name, price, imageUrl, qty }
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, imageUrl, qty = 1 } = action.payload;
      const existing = state.items.find((it) => it.id === id);
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ id, name, price, imageUrl, qty });
      }
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const existing = state.items.find((it) => it.id === id);
      if (existing && qty > 0) {
        existing.qty = qty;
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((it) => it.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;