// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Replace 'userSlice' with your actual slice

const store = configureStore({
  reducer: {
    // Add your slices here
    user: userReducer,
  },
});

export default store;
