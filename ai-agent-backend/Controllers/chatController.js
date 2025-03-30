const Chat = require("../Models/chatModel");
const Message = require("../Models/messageModel");
const asyncHandler = require("../Utils/AsyncHandler");
const CustomError = require("../Utils/CustomError");

exports.createChat = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  const chat = await Chat.create({
    title,
  });

  if (!chat) {
    return next(new CustomError("Error while creating chat. Try Again!", 400));
  }

  res.status(201).json({
    status: "success",
    statusCode: 201,
    message: "Chat created successfully",
    chat,
  });
});

exports.getAllChats = asyncHandler(async (req, res, next) => {
    const { search } = req.query;
    
    // Build the query object
    const filter = {};
    if (search) {
      filter.title = { 
        $regex: search,
        $options: 'i' // Case insensitive
      };
    }
  
    const chats = await Chat.find(filter).sort("-updatedAt");
  
    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: search 
        ? "Search results fetched successfully"
        : "All chats fetched successfully",
      length: chats.length,
      chats,
    });
  });

exports.getOneChat = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  if (!chatId) {
    return next(
      new CustomError("Please provide Chat Id which you want to fetch", 400)
    );
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new CustomError("Chat with this Id no longer exists", 404));
  }

  const messages = await Message.find({ chat: chat?._id }).sort("createdAt");

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Chat fetched successfully",
    chat,
    messages,
  });
});

exports.searchChats = asyncHandler(async (req, res, next) => {
  const { search } = req.query;

  if (!search) {
    return next(new CustomError("Search query is required", 400));
  }

  const chats = await Chat.find({
    title: { $regex: search, $options: "i" },
  }).sort("-lastMessageTime");

  res.status(200).json({
    status: "success",
    statusCode: 200,
    length: chats.length,
    chats,
  });
});
