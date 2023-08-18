import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "./apiService";

export const login = createAsyncThunk("auth/login", async (body, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await apiService.public.post("/auth/login/", body);

    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.detail);
  }
});
export const register = createAsyncThunk(
  "auth/register",
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.public.post("/auth/register/", body);

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.detail);
    }
  }
);

export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;
  try {
    const stateBefore = getState();
    stateBefore.chat.chats = [];
    const res = await apiService.public.post("/auth/logout/");

    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.detail);
  }
});
