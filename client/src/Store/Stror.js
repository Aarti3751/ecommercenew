// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import searchFilterReducer from './Slices/searchFilterSlice'; // The slice that contains the searchTerm
import cartReducer from './Slices/cart'; // Your cart slice
import wishlistReducer from './Slices/wishlist'; // Your wishlist slice

const store = configureStore({
  reducer: {
    search: searchFilterReducer, // Ensure the search filter reducer is added here
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
