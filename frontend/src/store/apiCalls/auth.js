import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const login = createAsyncThunk("auth/login", async (body, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.post("http://127.0.0.1:8000/auth/login/", body);

    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.post("http://127.0.0.1:8000/auth/logout/");

    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
