// src/Store/Slices/wishlist.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to get wishlist data from localStorage
const getWishlistFromLocalStorage = () => {
  const savedWishlist = localStorage.getItem('wishlist');
  return savedWishlist ? JSON.parse(savedWishlist) : [];
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: getWishlistFromLocalStorage(), // Load data from localStorage if available
  reducers: {
    addToWishlist: (state, action) => {
      const existingProduct = state.find((product) => product._id === action.payload._id);
      if (!existingProduct) {
        state.push(action.payload); // Add product if it doesn't exist
      }
      // Save updated wishlist to localStorage
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
    removeFromWishlist: (state, action) => {
      const updatedState = state.filter((product) => product._id !== action.payload);
      // Save updated wishlist to localStorage
      localStorage.setItem('wishlist', JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
