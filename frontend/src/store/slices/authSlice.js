import { createSlice } from '@reduxjs/toolkit';

const getInitialAuth = () => {
  if (typeof window !== 'undefined') {
    const isAuth = localStorage.getItem('yatra_auth') === 'true';
    const userStr = localStorage.getItem('yatra_user');
    return {
      isAuthenticated: isAuth,
      user: userStr ? JSON.parse(userStr) : null
    };
  }
  return { isAuthenticated: false, user: null };
};

const initialState = getInitialAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      if (typeof window !== 'undefined') {
         localStorage.setItem('yatra_auth', 'true');
         localStorage.setItem('yatra_user', JSON.stringify(action.payload));
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== 'undefined') {
         localStorage.removeItem('yatra_auth');
         localStorage.removeItem('yatra_user');
      }
    }
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
