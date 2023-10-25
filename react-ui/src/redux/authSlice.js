// src/redux/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // You can store user data here
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
