import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  token: null,
  isAuth: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuth = !!token;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.loading = false;
    },
  },
});

export const { setAuthState, loginStart, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
