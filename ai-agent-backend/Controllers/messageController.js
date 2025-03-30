const Chat = require("../Models/chatModel");
const Message = require("../Models/messageModel");
const asyncHandler = require("../Utils/AsyncHandler");
const CustomError = require("../Utils/CustomError");
const { generateAIResponse } = require("../Utils/Gemini");
const { formatCurrentTime } = require("../Helpers/FormatTime");

exports.createMessage = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  const { content } = req.body;
  if (!content || !chatId) {
    return next(
      new CustomError("Both 'content' and 'chatId' are required fields", 400)
    );
  }

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new CustomError("Chat with this ID no longer exists", 404));
  }

  const currentTime = formatCurrentTime();

  const userMessage = await Message.create({
    content,
    sender: "user",
    chat: chat?._id,
    messageTime: currentTime,
  });

  if (!userMessage) {
    return next(
      new CustomError("Error while generating user message. Try Again!", 400)
    );
  }

  chat.lastMessage = content;
  chat.lastMessageTime = currentTime;

  await chat.save();

  const chatHistory = await Message.find({ chat: chatId }).sort("createdAt");

  //Formatting Messages for Gemini to maintain Context of previous prompts
  const openaiMessages = chatHistory.map((msg) => ({
    role: msg?.sender === "user" ? "user" : "assistant",
    content: msg?.content,
  }));

  const aiResponseMessage = await generateAIResponse(openaiMessages, next);

  if (!aiResponseMessage) {
    return next(
      new CustomError(
        "Error while getting response from the AI. Try Again!",
        400
      )
    );
  }
  console.log("Ai REsponse is:", aiResponseMessage);
  const aiMessage = await Message.create({
    content: aiResponseMessage,
    sender: "ai",
    chat: chat?._id,

    messageTime: formatCurrentTime(),
  });

  if (!aiMessage) {
    return next(
      new CustomError(
        "Error while saving Ai Response message to Database. Try Again!",
        400
      )
    );
  }

  res.status(201).json({
    status: "success",
    statusCode: 201,
    message: "Message Sent Successfully",
    userMessage,
    aiMessage,
  });
});
