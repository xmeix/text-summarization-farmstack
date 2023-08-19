import { createSlice } from "@reduxjs/toolkit";
import { addChat, addInChat, deleteChat, getChats } from "./apiCalls/chat";
import { login, logout } from "./apiCalls/auth";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getChats.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chats = action.payload;
    });
    builder.addCase(getChats.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // add chat
    builder.addCase(addChat.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chats.push(action.payload);
    });
    builder.addCase(addChat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // add In chat
    builder.addCase(addInChat.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addInChat.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addInChat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete chat
    builder.addCase(deleteChat.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chats = state.chats.filter((el) => el._id !== action.payload);
    });
    builder.addCase(deleteChat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // logout
    builder.addCase(logout.pending, (state) => {
      state.chats = []; // Reset chats to an empty array
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.chats = []; // Reset chats to an empty array
    });
  },
});

export default chatSlice.reducer;
