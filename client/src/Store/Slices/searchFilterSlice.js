// src/Store/Slices/searchFilterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',  // Default to an empty string
  category: '',    // Default to an empty category
};

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setSearchTerm, setCategoryFilter } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
