import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.error = action.payload;
    },
    fetchUserProfileSuccess: (state, action) => {
      state.user = action.payload.body;
    },
    fetchUserProfileFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
    updateUserNameSuccess: (state, action) => {
      state.user = action.payload.body;
    },
    updateUserNameFailure: (state, action) => {
      state.error = action.payload;
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

export const fetchUserProfile = (token) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(fetchUserProfileSuccess(data));
    } else {
      dispatch(fetchUserProfileFailure(data.message || 'Failed to fetch profile'));
    }
  } catch (error) {
    dispatch(fetchUserProfileFailure('An error occurred. Please try again.'));
  }
};

export const updateUserName = (token, firstName, lastName) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(updateUserNameSuccess(data));
    } else {
      dispatch(updateUserNameFailure(data.message || 'Failed to update name'));
    }
  } catch (error) {
    dispatch(updateUserNameFailure('An error occurred. Please try again.'));
  }
};

export default authSlice.reducer;
