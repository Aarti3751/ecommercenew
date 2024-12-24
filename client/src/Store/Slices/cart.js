// src/Store/Slices/cart.js
import { createSlice } from '@reduxjs/toolkit'; // Add this import

const getCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : []; // Default to an empty array if nothing is found
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(), // Ensure this always returns an array
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find((product) => product._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeProduct: (state, action) => {
      const updatedState = state.filter((product) => product._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(updatedState));
      return updatedState;
    },
    increaseQuantity: (state, action) => {
      const product = state.find((product) => product._id === action.payload);
      if (product) {
        product.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decreaseQuantity: (state, action) => {
      const product = state.find((product) => product._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      localStorage.setItem('cart', JSON.stringify([]));
      return [];
    },
  },
});

export const { addToCart, removeProduct, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart; // Correctly reference the cart slice
export const selectCartCount = (state) => state.cart.reduce((total, product) => total + product.quantity, 0);

export default cartSlice.reducer;
