// userActions.js

import { loginUserStart, loginUserSuccess, loginUserFailure, registerUserStart } from './userSlice';

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginUserStart());
    // Make an API call for authentication
    const response = await AuthService.login(userData);
    dispatch(loginUserSuccess(response.data));
  } catch (error) {
    dispatch(loginUserFailure(error.message));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserStart());
    // Make an API call for registration
    const response = await AuthService.register(userData);
    dispatch(loginUserSuccess(response.data));
  } catch (error) {
    dispatch(loginUserFailure(error.message));
  }
};
