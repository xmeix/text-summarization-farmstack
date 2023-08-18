import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "./apiService";

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.get(`/chats/`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getChat = createAsyncThunk(
  "chat/getChat",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.get(`/chats/${id}/`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addChat = createAsyncThunk(
  "chat/addChat",
  async (title, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.post(`/chats/${title}/`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addInChat = createAsyncThunk(
  "chat/addInChat",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.put(`/chats/${data.id}/`, data.body);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.delete(`/chats/${id}/`);

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
