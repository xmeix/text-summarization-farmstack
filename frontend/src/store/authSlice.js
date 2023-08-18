import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./apiCalls/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    });
  },
});

export default authSlice.reducer;
