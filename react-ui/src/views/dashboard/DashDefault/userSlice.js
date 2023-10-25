// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,  // User data
    loading: false,  // Loading state
    error: null,  // Error state
  },
  reducers: {
    loginUserStart: (state) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerUserStart: (state) => {
      state.loading = true;
    },
    // Define more reducer functions as needed
  },
});

export const { loginUserStart, loginUserSuccess, loginUserFailure, registerUserStart } = userSlice.actions;
export default userSlice.reducer;
