const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please provide the title of the chat"],
      default: "New Chat",
    },

    lastMessage: {
      type: String,
    },

    lastMessageTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
