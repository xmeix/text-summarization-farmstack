import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`http://127.0.0.1:8000/chats/`);

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
      const res = await axios.get(`http://127.0.0.1:8000/chats/${id}/`);

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
      const res = await axios.post(`http://127.0.0.1:8000/chats/${title}/`);

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
      const res = await axios.post(
        `http://127.0.0.1:8000/chats/${data.id}/`,
        data.body
      );

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
      const res = await axios.delete(`http://127.0.0.1:8000/chats/${id}/`);

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
