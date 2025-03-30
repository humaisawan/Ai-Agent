import React from "react";

const ChatHeader = ({ chatTitle }) => {
  return (
    <div className="border-b border-neutral-300 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-white mr-3">
          {chatTitle.charAt(0)}
        </div>
        <div>
          <p className="font-urbanist font-medium">{chatTitle}</p>
          <p className="text-xs text-green-500 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            {"Active Now"}
          </p>
        </div>
      </div>
      <div>
        <button className="text-gray-500 hover:text-gray-700">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
