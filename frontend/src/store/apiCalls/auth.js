import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "./apiService";

export const login = createAsyncThunk("auth/login", async (body, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await apiService.public.post("/auth/login/", body);

    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await apiService.public.post("/auth/logout/");

    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
