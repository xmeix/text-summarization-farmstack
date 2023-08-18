import { createSlice } from "@reduxjs/toolkit";
import { addChat, deleteChat, getChats } from "./apiCalls/chat";

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
  },
});

export default chatSlice.reducer;
