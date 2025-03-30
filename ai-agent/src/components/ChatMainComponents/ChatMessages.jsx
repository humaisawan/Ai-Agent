import React from 'react';

const ChatMessages = ({ messages, chatTitle }) => {
  return (
    <div className="flex-grow p-6 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`mb-6 flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.sender === "ai" && (
            <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-white mr-2">
              {chatTitle.charAt(0)}
            </div>
          )}
          <div className="flex flex-col max-w-[70%]">
            <div
              className={`p-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-stone-900 text-white rounded-tr-none"
                  : "bg-gray-100 text-black rounded-tl-none"
              }`}
            >
              {message.content}
            </div>
            <div
              className={`flex items-center text-xs text-gray-500 mt-1 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.messageTime}
              {message.sender === "user" && message.read && (
                <svg
                  className="w-4 h-4 ml-1 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
          </div>
          {message.sender === "user" && (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white ml-2">
              T
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;