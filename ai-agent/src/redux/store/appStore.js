import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "../slices/conversationSlice";

const appStore = configureStore({
  reducer: {
    conversation: conversationReducer,
  },
});

export default appStore;
