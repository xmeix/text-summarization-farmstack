import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const login = createAsyncThunk("auth/login", async (body, thunkAPI) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/auth/login/", body);

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
