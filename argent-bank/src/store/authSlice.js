import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    loginFailure: (state) => {
      state.token = null;
    },
    fetchUserProfileSuccess: (state, action) => {
      state.user = action.payload;
    },
    fetchUserProfileFailure: (state) => {
      state.user = null;
    },
    updateUserNameSuccess: (state, action) => {
      state.user = action.payload.body;
    },
    updateUserNameFailure: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  updateUserNameSuccess,
  updateUserNameFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;