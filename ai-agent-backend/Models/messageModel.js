const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    responseId:{
        type: String
    },
    content: {
      type: String,
      trim: true,
      required: [true, "please provide the content of the message"],
    },

    sender: {
      type: String,
      enum: {
        values: ["user", "ai"],
        message: "please provide valid sender value e.g: user, ai",
      },

      required: [true, "sender is a required field"],
    },

    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: [true, "chat is a required field"],
    },

    messageTime: {
      type: String,
      required: [true, "message time is a required field"],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
