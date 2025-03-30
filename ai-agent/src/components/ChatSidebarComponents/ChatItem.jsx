import React from "react";
import logo from "../../assets/images/logo.png";

const ChatItem = ({
  title,
  lastMessage,
  lastMessageTime,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 border-b border-neutral-200 ${
        isActive ? "bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-white mr-3">
        <img src={logo} alt="Chat avatar" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <p className="font-urbanist font-medium">{title}</p>
          <span className="text-xs text-gray-500">{lastMessageTime}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
      <div
        className={`w-2 h-2 rounded-full ${
          isActive ? "bg-green-500" : "bg-transparent"
        }`}
      ></div>
    </div>
  );
};

export default ChatItem;