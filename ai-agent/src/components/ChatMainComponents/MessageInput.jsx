import React from 'react';
import { Smile, Paperclip, Mic } from "lucide-react";

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage, isLoading, activeChat }) => {
  return (
    <div className="border-t border-neutral-300 p-4">
      <form onSubmit={handleSendMessage} className="flex items-center">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 mr-2"
        >
          <Smile size={20} />
        </button>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 mr-2"
        >
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow py-2 px-4 border border-neutral-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
          disabled={isLoading || !activeChat}
        />
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 ml-2"
          disabled={isLoading || !newMessage.trim()}
        >
          <Mic size={20} />
        </button>
        <button
          type="submit"
          className="ml-2 bg-stone-900 text-white p-2 rounded-full hover:bg-stone-700 disabled:opacity-50"
          disabled={isLoading || !activeChat}
        >
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
              d="M5 12h14M12 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;