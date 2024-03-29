import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "./apiService";

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.get(`/chats/`);
      console.log(res.data);
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
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log(body);
      const res = await apiService.user.post(`/chats/`, body.title);

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
      console.log("data", data);
      const res = await apiService.user.put(`/chats/${data.id}/`, data.body);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.detail);
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
