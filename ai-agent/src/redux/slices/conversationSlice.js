import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action) => {
      state.conversations.unshift(action.payload);
    },
    updateLastMessage: (state, action) => {
      const { chatId, lastMessage, lastMessageTime } = action.payload;
      const index = state.conversations.findIndex((c) => c._id === chatId);
      if (index > -1) {
        // Removing the convesation and putting it at the beginning of the array to maintain the sorted order
        const updated = state.conversations.splice(index, 1)[0];
        updated.lastMessage = lastMessage;
        updated.lastMessageTime = lastMessageTime;
        state.conversations.unshift(updated);
      }
    },
  },
});

export const { setConversations, addConversation, updateLastMessage } =
  conversationSlice.actions;

export default conversationSlice.reducer;
