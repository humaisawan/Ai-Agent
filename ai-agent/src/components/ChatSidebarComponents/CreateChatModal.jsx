import React, { useState } from "react";
import { X } from "lucide-react";

const CreateChatModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-urbanist font-semibold">
            Create New Chat
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="chatTitle"
          >
            Chat Title
          </label>
          <input
            type="text"
            id="chatTitle"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500"
            placeholder="Enter chat title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              onSubmit(title);
              setTitle("");
            }}
            disabled={!title.trim()}
            className="bg-stone-800 text-white px-4 py-2 rounded hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatModal;